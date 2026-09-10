# codeworks.ind.in — static site

Ten hand-authored pages, no build step. Deployed to GitHub Pages from the root of
`main`; the same folder will serve from any static host (nginx, S3 + CloudFront,
Netlify, Cloudflare Pages).

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
| `privacy.html` | Privacy policy — **draft, see below** |
| `site.css` | Tokens, both themes, chrome behaviour, hover/focus and responsive rules |
| `site.js` | Theme toggle, products menu, mobile nav, reveals, enquiry form |
| `sitemap.xml`, `robots.txt` | Search |
| `codeworks-logo*.png` | Wordmark (light ground and reversed) |
| `favicon-32.png`, `icon-512.png`, `apple-touch-icon.png` | Square mark, cut from the wordmark's split-circle O |
| `og-card.png` | 1200×630 social card (reversed wordmark on the band colour) |
| `CNAME` | Custom domain. **Currently absent** — see Deployment |
| `.nojekyll` | Stops GitHub Pages running the files through Jekyll |

## Before going live

1. **Wire the enquiry form.** Open `site.js` and set `ENDPOINT` to a POST URL that
   accepts JSON (`name`, `institution`, `email`, `role`, `intent`, `context`, plus
   `consent`, `consentText` and `consentAt`). While it is empty the form falls back
   to opening a prefilled mail draft to `sales@codeworks.ind.in`, so no enquiry is
   lost — but a real endpoint is better. GitHub Pages is static, so this needs an
   external service (Formspree and similar), a Cloudflare Worker, or a Google Apps
   Script bound to your own account.
2. **Have the privacy policy reviewed.** `privacy.html` is structured for the DPDP
   Act 2023 and is accurate to what this site actually does, but it has *not* been
   through counsel. Fill `[REGISTERED ADDRESS]`, `[GRIEVANCE OFFICER NAME]`,
   `[GRIEVANCE EMAIL]` and `[EFFECTIVE DATE]`, and get it reviewed before launch.
   The contact form carries a matching consent checkbox.
3. **Point the domain at GitHub Pages** — see Deployment.
4. **Replace the illustrative figures** in the product panels with cleared numbers
   before using the site for regulated claims. The footer says they are illustrative.

Done and needing nothing further: the canonical host (every page declares
`https://codeworks.ind.in/…`), the favicon and social card, and compression —
GitHub Pages serves gzip with `cache-control` automatically.

## Deployment

Repo `fzmgt5c478-svg/codeworks-site`, Pages building from `main` at `/`. Pushing to
`main` redeploys; a build takes about half a minute.

The `CNAME` file was **removed** so the site can be previewed at
`fzmgt5c478-svg.github.io/codeworks-site/`. With a CNAME present, GitHub redirects
that URL to the custom domain, so the site is unreachable until DNS resolves. To go
live on `codeworks.ind.in`:

1. At the registrar (nameservers are GoDaddy's `ns47/ns48.domaincontrol.com`),
   delete the parked `A` record and add four `A` records for `@`:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   Add a `CNAME` for `www` → `fzmgt5c478-svg.github.io`.
2. Restore a `CNAME` file containing `codeworks.ind.in`, and set the custom domain
   in Settings → Pages.
3. Once GitHub verifies the domain and issues a certificate, tick **Enforce HTTPS**.

## Notes

- **Theming.** `data-theme="light" | "dark"` on `<html>`, persisted in
  `localStorage` under `cw-theme`, set by an inline script in `<head>` before
  first paint so there is no flash. All colour lives in the two token blocks at
  the top of `site.css` — change a value there and it applies site-wide.
- **Responsive behaviour** lives in one `@media (max-width:899px)` block in
  `site.css`. Below that width the hero panels are hidden (`.cw-hero-panel`), the
  four-column tables collapse to two (`.cw-tbl`), the header controls lose their
  borders (`.cw-chrome`), and `.cw-hide-sm` / `.cw-sm` swap long copy for short.
  The panels are still authored in full, so restoring them to mobile is one line.
- **No framework, no fonts to self-host** — Space Grotesk and IBM Plex Mono load
  from Google Fonts. Self-host them if you want zero third-party requests; the
  privacy policy discloses that Google receives visitors' IP addresses.
- **Figures in the product panels are illustrative**, as the footer states. They
  are modelled on real product output — the SPECTRA claim computation, Drishti's
  investigation patterns, Samanvaya's payout grid — but the numbers are synthetic.
- **Accessibility.** Body copy meets 4.5:1 in both themes; the dark-band panels
  measure 7.4:1 or better. If you change a token, re-check the micro-labels
  (10.5–11px monospace) — they were the tightest cases.
- **No analytics, no cookies, no trackers.** The only browser storage is the
  theme preference. Keep it that way, or the privacy policy needs revisiting.
