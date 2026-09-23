# KALM-NTG ARCHITECTS — Brochure Website

Premium static brochure website for KALM-NTG ARCHITECTS.

## Stack
- Plain HTML5
- CSS3
- Vanilla JavaScript
- No framework or build step
- Designed for GitHub Pages, Netlify, Cloudflare Pages, or similar static hosting

## Before publishing
Replace the temporary image assets in `assets/images/` with real company/project photography using the same filenames:

- `hero-modern-residence.jpg`
- `project-residential-renovation.jpg`
- `project-new-build.jpg`
- `project-architectural-design.jpg`
- `project-site-supervision.jpg`
- `project-roofing.jpg`

The current images are temporary concept visuals and should not be presented as completed KALM-NTG projects.

Also update:
- `assets/js/site.js` → `SITE_CONFIG.facebookUrl`
- `assets/js/site.js` → `SITE_CONFIG.formEndpoint`
- Botswana and Zimbabwe office details on `locations.html` and `contact.html`

## Contact form
The form is prepared for Formspree. Create a free Formspree form and replace:
`https://formspree.io/f/YOUR_FORM_ID`
with your actual endpoint in `assets/js/site.js`.

Alternative: if you deploy on Netlify, you can use Netlify Forms instead. See the deployment notes below.

## GitHub Pages
1. Create a GitHub repository.
2. Upload this entire folder.
3. Enable Pages from the repository's Pages settings.
4. Publish from the `main` branch / root.

## Recommended production hosting
Keep GitHub as the source of truth, then connect the repository to **Netlify** if you want the simplest built-in contact-form handling, or **Cloudflare Pages** if you want Git-based deployments and Cloudflare's edge platform.

GitHub Pages is excellent for the static site itself, but it does not run server-side form processing; use Formspree or another form service there.

## Pages
- Home
- About
- Services
- Architecture & Design
- Construction
- Construction Supervision
- Projects
- Locations
- Contact

## Business information currently supplied
Public brand: KALM-NTG ARCHITECTS
Legal entity: KALM.Ntg Architects (Pty) Ltd
Tagline: Inspired by the Past
Johannesburg: 39 Meyer Street, Triomf 2092 | 073 152 4714
Mahikeng: 25 Churchill Street, Golfview, Mafikeng 2745 | 076 317 9459
Email: kalmntgarch@gmail.com
VAT No: 4500294139
Reg No: 2012/175002/07

Botswana and Zimbabwe details are intentionally left as clearly marked placeholders until exact information is supplied.
