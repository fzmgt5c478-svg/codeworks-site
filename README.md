# codeworks.ind.in — static site

Nine hand-authored pages, no build step. Upload the contents of this folder to any
static host (nginx, S3 + CloudFront, Netlify, Cloudflare Pages, GitHub Pages).

## Files

| File | Page |
| --- | --- |
| `index.html` | Home |
| `drishti-ai.html` | Drishti.AI — credit appraisal |
| `spectra.html` | SPECTRA — government scheme claims |
| `samanvaya.html` | Samanvaya — commission settlement |
| `platform.html` | Platform — engine, analysts, officer |
| `security.html` | Security & deployment |
| `company.html` | Company |
| `services.html` | Engineering services |
| `contact.html` | Contact |
| `site.css` | Tokens, both themes, chrome behaviour, hover/focus rules |
| `site.js` | Theme toggle, products menu, mobile nav, reveals, enquiry form |
| `sitemap.xml`, `robots.txt` | Search |
| `codeworks-logo*.png` | Wordmark (light ground and reversed) |

## Before going live

1. **Wire the enquiry form.** Open `site.js` and set `ENDPOINT` to a POST URL that
   accepts JSON (`name`, `institution`, `email`, `role`, `intent`, `context`).
   While it is empty the form falls back to opening a prefilled mail draft to
   `sales@codeworks.ind.in`, so no enquiry is lost — but a real endpoint is better.
2. **Confirm the canonical host.** Every page declares
   `https://codeworks.ind.in/…` in `<link rel="canonical">` and `og:url`.
   Change these if the domain differs.
3. **Add a privacy policy** and link it from the footer. The contact form collects
   name, work email, role and institution; a DPDP-compliant notice and consent
   step should be reviewed by counsel before launch.
4. **Replace the favicon.** `codeworks-logo.png` is a wide wordmark and will look
   cramped at 16px. A square mark exported as `favicon.ico` / `icon-512.png` is better.
5. **Serve with compression** (gzip or brotli) and long `Cache-Control` on
   `site.css`, `site.js` and the PNGs.

## Notes

- **Theming.** `data-theme="light" | "dark"` on `<html>`, persisted in
  `localStorage` under `cw-theme`, set by an inline script in `<head>` before
  first paint so there is no flash. All colour lives in the two token blocks at
  the top of `site.css` — change a value there and it applies site-wide.
- **No framework, no fonts to self-host** — Space Grotesk and IBM Plex Mono load
  from Google Fonts. Self-host them if you want zero third-party requests.
- **Figures in the product panels are illustrative**, as the footer states. Replace
  them with cleared numbers before using the site for regulated claims.
- **Accessibility.** Body copy meets 4.5:1 in both themes. If you change a token,
  re-check the micro-labels (10.5–11px monospace) — they were the tightest cases.
