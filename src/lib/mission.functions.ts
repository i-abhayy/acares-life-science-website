import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const PROMPT = `You are writing an accessible transcript of a short company video for visitors who cannot see or hear it.
Write in plain English, in this order:
1. "On-screen text:" — every word of text shown in the video, exactly as written, in the order it appears.
2. "Speech:" — every spoken word verbatim, or "No speech." if there is none.
3. "Visual description:" — 2 to 5 short sentences describing what happens on screen.
Describe only what is in the video. Do not add claims, facts or marketing language. Plain text, no markdown symbols.`;

async function streamTranscript(videoUrl: string, apiKey: string): Promise<string> {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: "google/gemini-3.8-flash",
      stream: true,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: PROMPT },
            { type: "video_url", video_url: { url: videoUrl } },
          ],
        },
      ],
    }),
  });

  if (!res.ok || !res.body) {
    let msg = `Transcript service error (${res.status}).`;
    try {
      const j = await res.json();
      msg = j?.error?.message || j?.message || msg;
    } catch {}
    if (res.status === 402) msg = "AI credits have run out. Add credits in Settings → Plans & credits, then try again.";
    if (res.status === 429) msg = "Too many requests right now. Please wait a minute and try again.";
    throw new Error(msg);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, idx).trim();
      buf = buf.slice(idx + 1);
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (data === "[DONE]") continue;
      try {
        const j = JSON.parse(data);
        if (j.error) throw new Error(j.error.message || "Transcript service error.");
        text += j.choices?.[0]?.delta?.content ?? "";
      } catch (e) {
        if (e instanceof SyntaxError) continue;
        throw e;
      }
    }
  }
  return text.trim();
}

export const generateMissionTranscript = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (!isAdmin) throw new Error("Only site admins can do this.");

    const { data: row, error } = await supabase.from("mission_media").select("video_path").eq("id", "mission").maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Upload a video first.");

    const { data: signed, error: sErr } = await supabase.storage.from("site-media").createSignedUrl(row.video_path, 600);
    if (sErr || !signed) throw new Error(sErr?.message || "Could not read the video.");

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured.");

    const transcript = await streamTranscript(signed.signedUrl, apiKey);
    if (!transcript) throw new Error("The AI returned no transcript. Please write one by hand.");

    const { error: uErr } = await supabase
      .from("mission_media")
      .update({ transcript, updated_at: new Date().toISOString() })
      .eq("id", "mission");
    if (uErr) throw new Error(uErr.message);
    return { transcript };
  });
