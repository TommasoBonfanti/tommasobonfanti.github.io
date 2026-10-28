# tommasobonfanti.github.io

My personal website. Plain HTML + one CSS file, no build step.

```
index.html        home
projects.html     projects
style.css         shared styles (colours and font at the top, under "Tokens")
assets/photo.jpg  photo
assets/cv.pdf     CV
assets/favicon.svg
```

## Preview locally

Open `index.html` in a browser, or, for an exact preview, run this in the folder and visit http://localhost:8000:

```bash
python -m http.server 8000
```

## Edit the text

- **Bio, experience, education:** in `index.html`. Each timeline entry is one `<li>`:
  ```html
  <li>
    <span class="date">Feb – June 2026</span>
    What you did, where
  </li>
  ```
  Copy one, change the text, keep newest first.
- **CV / photo:** replace `assets/cv.pdf` or `assets/photo.jpg` with a new file of the same name.
- **Colours / font size:** change the variables at the top of `style.css`.
- Search for `TODO` to find things still to finish (the bio is a draft).

## Add a project

In `projects.html`, there is a commented-out example. For the first project:

1. Delete the line `<p class="muted">Projects coming soon.</p>`.
2. Copy the `<ul class="project-list">…</ul>` block out of the comment and fill it in.
3. For each further project, add another `<li class="project">…</li>` inside the same list. The link is optional: drop ` · <a …>Link</a>` if there isn't one.

## Deploy (GitHub Pages)

The repository must be named `<your-github-username>.github.io`.

First time:

```bash
git init
git add .
git commit -m "First version"
git branch -M main
git remote add origin https://github.com/<username>/<username>.github.io.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `/ (root)`**. The site appears at `https://<username>.github.io` after a minute or two.

Every later update:

```bash
git add .
git commit -m "Describe the change"
git push
```

If your username isn't `tommasobonfanti`, update the `og:url` and `og:image` URLs in the `<head>` of both HTML files.

## Custom domain (later)

1. Buy a domain (e.g. `tommasobonfanti.com`).
2. Add a file named `CNAME` (no extension) to this folder containing only the domain, e.g. `tommasobonfanti.com`, then commit and push.
3. At your domain registrar, add DNS records:
   - four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - one `CNAME` record for `www` pointing to `<username>.github.io`
4. In **Settings → Pages**, enter the domain under *Custom domain*, wait for the DNS check, then tick **Enforce HTTPS**.
5. Update the `og:url` and `og:image` URLs in both HTML files to the new domain.
