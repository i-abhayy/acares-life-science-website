<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Mission video override lives in Lovable Cloud (`mission_media` single row + private `site-media` bucket, signed URLs); About page falls back to the bundled video when no row exists. Why: workspace blocks public buckets and admins must swap video without a code change.
- Admin access is checked with the `has_role` DB function over `user_roles`; AI transcripts use a video-capable Gemini model via chat completions in a server function. Why: the default chat model has no video input.
- TiltCard's glare overlay carries an explicit z-index and offers a `sheen` variant for light-surfaced cards. Why: a `<button>` child paints above unpositioned siblings, and the soft-light white glare is invisible on near-white cards.
