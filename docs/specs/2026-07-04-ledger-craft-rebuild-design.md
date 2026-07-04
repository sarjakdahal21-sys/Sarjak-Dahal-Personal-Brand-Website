# sarjakdahal.com.np — "Ledger, at full craft" rebuild

Date: 2026-07-04. Built with Claude Fable 5 at Sarjak's request ("build it with the best possible model").

## Decision

Keep the Navy & Brass ledger identity from the 2026-07-03 rebuild (it is the newest
deliberate direction and suits an ACCA finance educator). Do not revert to the
charcoal/burgundy deck palette, and do not borrow Pentaprime's electric look —
that palette belongs to Pentaprime's logo. What changes is the level of craft:
type, motion, and composition are rebuilt to feel like a designed object, not a template.

## What stays fixed (non-negotiable)

- All copy facts, social links, ACCA claims, and the approved Jul-3 copy voice.
- Rubik as the only typeface family (weight/size/optical differentiation only).
- Numbers appear only on the sequential Verify → Cite → State method; never on
  non-sequential card lists.
- No fake metrics, no invented testimonials, no counters with made-up numbers.
- Sarjak's dislikes: no crowded hero, no shaky hover/3D, no accidental-looking
  decorative boxes, no oversized phone text, no long AI-sounding copy.
- Same four pages + shared `assets/css/site.css` / `assets/js/site.js`, GitHub
  Pages + Cloudflare deploy, `?v=` cache-busting bumped to 16.
- Reduced-motion users get a fully static, complete site.

## The concept: a living ledger

The site behaves like a precision financial document that has come alive:

1. **Hero (dark band)** — a full-height composition on ledger-ink navy with a
   subtle animated canvas: fine graph-paper rulings and a brass line that plots
   itself once on load (drawn with easing, then holds; no loops, no noise).
   Headline reveals line-by-line through clip masks. Portrait sits in a
   hairline-framed plate with a brass folio tab.
2. **Ledger ticker** — a slow hairline-bounded marquee of his working standard
   ("Verified first · Cited sources · Limits stated · …"). Pauses on hover;
   static row under reduced motion.
3. **Scroll choreography** — every section reveals with masked, staggered
   entrances (translate + clip). One shared IntersectionObserver; items reveal
   once and stay.
4. **Method as the signature interaction (About)** — Verify → Cite → State
   rendered as a ledger column where a brass rule draws downward as you scroll
   and each step ignites in turn (scroll-linked, smooth, no snapping).
5. **Cards** — flat, hairline-ruled, with brass corner ticks that draw in on
   hover and a calm lift. No shadows-as-decoration; shadow only supports lift.
6. **Footer** — oversized outline "SARJAK DAHAL" watermark in low contrast,
   editorial sign-off row above it.
7. **Micro-interactions** — magnetic pull on primary buttons (≤3px, damped),
   underline draws on nav, scroll progress hairline kept.
8. **404 page** — added ("This entry isn't in the ledger."), matching system.

## Architecture

Static site, no build step. One shared CSS file (design tokens at top), one
shared JS file (IIFE, feature-detected: reveal observer, canvas hero, marquee
duplication, method scroll-link, magnetic buttons; every effect gated on
`prefers-reduced-motion`). All meta/OG/schema, skip links, and semantics carry
over from the Jul-3 pages.

## Risks

- Canvas hero must degrade to plain band if JS fails: grid + composition are
  CSS; canvas is enhancement only.
- Marquee duplication done in JS with `aria-hidden` clones to keep the
  accessibility tree clean.
- Motion is once-and-done (draw, reveal, hold) — nothing loops except the
  slow ticker.

## Out of scope

Deployment (commit locally, hand Sarjak the push command), copy rewrites beyond
light fitting, new pages beyond 404, image re-processing.
