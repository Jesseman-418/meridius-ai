# Meridius — premium web studio

A buildless, Vercel-ready website: custom dark editorial main brand and eight distinct fictional concept businesses. 40 HTML pages including the custom 404.

## Run and deploy

- Local preview: `python -m http.server 4173 --directory dist`
- Vercel project root: repository root. Framework: Other. Output directory: `dist`. No install or build command.
- `vercel.json` preserves clean URLs and trailing slashes.
- Production URL: https://meridius-ai.vercel.app

## Commercial journey

The website presents the existing $999 USD website / $89 USD monthly care offer. The user selected **invoice-first**: the visitor submits an enquiry, scope is agreed, and the owner issues an invoice outside this site. There is deliberately no card collection or automatic charge.

The project form validates the brief and provides an explicitly labeled `mailto:` action to meridiusai.agency@gmail.com, with copy/download fallbacks. The visitor must send that email in their own mail application. It does not claim a message was sent and needs no credentials or backend. Email delivery after the visitor presses Send depends on their email provider. No email was sent during testing.

## Content integrity

All eight sample brands are fictional. Every sample carries a persistent concept notice; sample forms never transmit, store, book, or charge. The aspirational quote is explicitly labeled illustrative, not a real client testimonial. Replace it only with an approved real customer quote.

Existing WebP photography is reused from the original repository. Confirm your rights to those existing assets before a commercial launch; this change does not introduce new external stock assets. No external font, tracker, or animation dependency is required.

## Editing

- `scripts/build.py`: main and sample page content; regenerate with Python 3.
- `dist/assets/meridius.css`: main studio visual system.
- `dist/assets/samples-v2.css`: eight individual brand themes.
- `dist/assets/base.css`: shared accessibility defaults.
- `dist/assets/site.js`: menu, reduced-motion-aware animation, enquiry and demo forms.
- Generated pages are committed, so Vercel requires no Python installation.

## Checks

- `python scripts/check.py` verifies local links/assets, anchors, metadata, landmarks, image alternatives and form labels.
- `node --check dist/assets/site.js` verifies JavaScript syntax.
- Responsive and interactive browser results are recorded in `QA.md`.
