# Working on this site

Personal website for Joe Wu, served by GitHub Pages from `main`.

## Layout
- `content.js`: all text and settings (JSON after `window.SITE =`). `editor.html` edits it visually.
- `assets/site.js` renders the pages; `assets/style.css` holds the water-and-gold theme (gold accent `#c9a227`, dark mode by default).
- `notes/*.html`: Tripos notes, listed under `tripos.notes` in `content.js` with `course`, `title` and `file`. Add `"part": "definitions"` to show a note under the Definitions list instead of Part IA.

## Every change
- Bump the `?v=N` number on the three asset links in `index.html`, or browsers keep showing cached files.
- Test in Playwright at desktop and phone width (no sideways page scroll). KaTeX's CDN may be blocked in the sandbox: serve `katex@0.16.11` from npm locally via `page.route` when testing.

## Git and GitHub: no AI traces
- Author every commit as `Monoid13 <Monoid13@users.noreply.github.com>`.
- No `Co-Authored-By`, `Claude-Session` or "Generated with Claude Code" lines in commits, PR titles or PR bodies.
- Workflow: work on a branch, open a PR with a plain description, squash-merge it.
- The same rules apply to the private `Monoid13/Optibook-Trading-Bot` repo, whose `optibook_bot.py` is kept free of `#` comments.

## Tripos notes
- Each note is `<article class="note">` with an `<h4>` title, which gets the gold underline.
- Start each item with `<p><strong>Definition 3.2 (Name).</strong> …</p>`; the bold label becomes a gold heading with a divider above it.
- Proofs: `<p class="proof"><em>Proof.</em> …</p>`, ending with `\(\blacksquare\)`. For several parts, put `<span class="gap"></span><span class="step">(2)</span>` between them.
- Maths: `\( … \)` inline, `$$ … $$` displayed (KaTeX).
- When condensing lecture notes: keep the original numbering and every proof's steps, and shorten only the wording. Inline any result that a skipped item provided.
- Check the mathematics and point out any mistakes to the user.
- Courses use their Tripos names (Part IA: Groups, Numbers and Sets, Vectors and Matrices, Differential Equations, Analysis I, Probability, Vector Calculus, Dynamics and Relativity).
