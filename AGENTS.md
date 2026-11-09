# East Coast Concrete Technology

Static HTML, CSS, and JavaScript. Files live at the repository root. There is no build step.

## GitHub

- Repository: `ecotto7/ctieastcoast` (the `ecotto7` account, not BIG-IC).
- Public, like `ecotto7/answerflorida` and `ecotto7/spiritual-reboot-site`.
- Branch: `main`.
- Commit and push only when asked. Batch related changes into one commit.

## Netlify

- Team: Gonzo Systems. Team slug: `ecotto7`. Do not create the site on any other Netlify account.
- Confirm the team is Gonzo Systems before creating or changing the site.
- Import `ecotto7/ctieastcoast` with an empty build command and publish directory `.`.
- `netlify.toml` stays at the repo root with `publish = "."`.
- Deploys happen only by pushing to `main`.
- Never run `netlify deploy`, `netlify deploy --prod`, or a deploy through the Netlify tools unless explicitly asked. Each production deploy costs 15 credits from a shared 300/month pool. If that pool runs out, every site on the team pauses. The GitHub import is the one production deploy.
- Do not turn on Netlify DNS, change nameservers, or attach `ctieastcoast.com` until explicitly asked.
- When domain setup is requested: add the domain in Netlify first, keep DNS at the current provider, and leave email records alone.
- The live address is `https://www.ctieastcoast.com/`. The apex redirects to www, so www stays the primary domain.

## Pages

- Folder URLs: `/about-us/` is `about-us/index.html`. Never rename or move a page without a 301 in `netlify.toml`.
- Do not redirect a query string that already lands on the same path. Query strings are forwarded on 301s, and a homepage rule such as `/?p=` or `/?s=` back to `/` will loop.
- Keep mailto links as mailto links. Keep the phone number `386-788-4009` as it appears.
- Copyright starts at 2009. The end year is set in the HTML to the current year and updated by `js/site.js`. The line is `© Copyright 2009 – [year] by East Coast Concrete Technology`.
- Terms of Use is `terms-of-use/index.html`. Privacy Policy is `privacy-policy/index.html`. The plugin copies are `wpautoterms/terms-and-conditions/index.html` and `wpautoterms/privacy-policy/index.html`.

## Forms

Forms stay on their existing provider. Do not use Netlify Forms. Do not add `data-netlify`, a form-name field, or a honeypot. Do not tell future edits to use Netlify Forms.

- There is no WordPress search form on the public pages. Do not add one.
- Get a Quote is a Jotform iframe, form id `263125519557058`, at `https://form.jotform.com/263125519557058`. Keep that embed. Do not replace it with Netlify Forms.

## Content security policy

The policy in `netlify.toml` is `Content-Security-Policy-Report-Only`. It is not enforcing.

- No inline scripts. The only script is `/js/site.js`.
- Styles are `/css/styles.css`. Fonts are self-hosted in `/fonts/`.
- Images are local, in `/images/`.
- YouTube iframes are on About Us and Products. `frame-src` allows `https://www.youtube.com` and `https://www.youtube-nocookie.com`.
- Get a Quote frames `https://form.jotform.com`. That host is in `frame-src`.
- About Us links to `http://designcti.com`. That is a normal link, not a framed or scripted host.
