import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { generateMissionTranscript } from "@/lib/mission.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Site admin — ACARES Life Science" },
      { name: "description", content: "Admin area for managing the ACARES mission video." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Site admin — ACARES Life Science" },
      { property: "og:description", content: "Admin area for managing the ACARES mission video." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const input = "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground";
const btn = "rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-50";

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <section className="container-site max-w-2xl pb-24 pt-36">
      <p className="eyebrow">Site admin</p>
      <h1 className="mt-3 text-4xl font-bold text-navy">Mission video</h1>
      {!ready ? null : session ? <AdminPanel email={session.user.email ?? ""} userId={session.user.id} /> : <SignIn />}
    </section>
  );
}

function SignIn() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const { error } =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    setBusy(false);
    if (error) setMsg(error.message);
    else if (mode === "up") setMsg("Check your email to confirm the account. An existing admin must then grant admin access.");
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-4">
      <input className={input} type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className={input} type="password" required minLength={8} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className={btn} disabled={busy}>{mode === "in" ? "Sign in" : "Create account"}</button>
      <button type="button" className="ml-4 text-sm text-primary underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {mode === "in" ? "Need an account?" : "Have an account? Sign in"}
      </button>
      {msg && <p role="status" className="text-sm text-foreground/80">{msg}</p>}
    </form>
  );
}

function AdminPanel({ email, userId }: { email: string; userId: string }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [transcript, setTranscript] = useState("");
  const [hasVideo, setHasVideo] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.rpc("has_role", { _user_id: userId, _role: "admin" }).then(({ data }) => setIsAdmin(!!data));
    supabase.from("mission_media").select("transcript").eq("id", "mission").maybeSingle().then(({ data }) => {
      setHasVideo(!!data);
      setTranscript(data?.transcript ?? "");
    });
  }, [userId]);

  async function runTranscript() {
    setStatus("Writing the transcript with AI — this can take a minute…");
    try {
      const r = await generateMissionTranscript();
      setTranscript(r.transcript);
      setStatus("Transcript ready. Check it and fix anything wrong, then save.");
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Transcript failed.");
    }
  }

  async function upload() {
    if (!file) return;
    setBusy(true);
    setStatus("Uploading video…");
    const ext = file.name.split(".").pop()?.toLowerCase() || "mp4";
    const path = `mission/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("site-media").upload(path, file, { contentType: file.type });
    if (error) {
      setStatus(error.message);
      setBusy(false);
      return;
    }
    const { error: dbErr } = await supabase
      .from("mission_media")
      .upsert({ id: "mission", video_path: path, mime_type: file.type || "video/mp4", transcript: null, updated_at: new Date().toISOString() });
    if (dbErr) {
      setStatus(dbErr.message);
      setBusy(false);
      return;
    }
    setHasVideo(true);
    setTranscript("");
    await runTranscript();
    setBusy(false);
  }

  async function save() {
    setBusy(true);
    const { error } = await supabase.from("mission_media").update({ transcript, updated_at: new Date().toISOString() }).eq("id", "mission");
    setBusy(false);
    setStatus(error ? error.message : "Transcript saved.");
  }

  async function reset() {
    if (!confirm("Go back to the original mission video?")) return;
    setBusy(true);
    const { error } = await supabase.from("mission_media").delete().eq("id", "mission");
    setBusy(false);
    if (!error) {
      setHasVideo(false);
      setTranscript("");
    }
    setStatus(error ? error.message : "Restored the original video.");
  }

  const signOut = <button className="text-sm text-primary underline" onClick={() => supabase.auth.signOut()}>Sign out</button>;

  if (isAdmin === null) return null;
  if (!isAdmin)
    return (
      <div className="mt-8 space-y-3">
        <p>Signed in as {email}, but this account does not have admin access yet.</p>
        {signOut}
      </div>
    );

  return (
    <div className="mt-8 space-y-8">
      <p className="text-sm text-foreground/70">Signed in as {email}. {signOut}</p>
      <div className="space-y-3">
        <label className="block font-semibold text-navy" htmlFor="vid">Replacement video (MP4 or WebM, up to 50 MB)</label>
        <input id="vid" type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <div className="flex flex-wrap gap-3">
          <button className={btn} disabled={!file || busy} onClick={upload}>Upload and write transcript</button>
          {hasVideo && <button className="rounded-full border border-border px-6 py-3 font-semibold" disabled={busy} onClick={reset}>Use original video</button>}
        </div>
      </div>
      {hasVideo && (
        <div className="space-y-3">
          <label className="block font-semibold text-navy" htmlFor="tr">Transcript shown to visitors</label>
          <textarea id="tr" className={`${input} min-h-60`} value={transcript} onChange={(e) => setTranscript(e.target.value)} />
          <div className="flex flex-wrap gap-3">
            <button className={btn} disabled={busy} onClick={save}>Save transcript</button>
            <button className="rounded-full border border-border px-6 py-3 font-semibold" disabled={busy} onClick={async () => { setBusy(true); await runTranscript(); setBusy(false); }}>Rewrite with AI</button>
          </div>
        </div>
      )}
      {status && <p role="status" className="text-sm text-foreground/80">{status}</p>}
    </div>
  );
}
