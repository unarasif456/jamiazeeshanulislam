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

## Rules

- Each page section is a self-contained component in `src/components`, validating its own input with a zod schema in the same file, covered by a test in `src/test` asserting concrete rejection and acceptance values — why: the site is one long page, so a section that silently accepts bad data fails only when a parent reads the result.
- Keep Urdu (Nastaliq) text unclipped: any element that can hold a full Urdu word or sentence needs enough line box and overflow room for ascenders and descenders — why: clipped glyphs are the one defect that makes the whole site look broken to the people who read it.
