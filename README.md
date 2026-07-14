# Portfolio

## Run it locally

    bundle install
    bundle exec jekyll serve

Then open http://localhost:4000/your-name

## Deploy

1. Push this folder to the `main` branch of a public GitHub repo named `your-name`.
2. Repo → Settings → Pages.
3. Source: **Deploy from a branch**. Branch: `main`. Folder: `/ (root)`. Save.
4. Wait a few minutes. Live at `https://<username>.github.io/your-name`

Every push to `main` redeploys automatically.

## Renaming the repo later

Change one line in `_config.yml`:

    baseurl: "/whatever-the-new-name-is"

If you rename it to `<username>.github.io` (a root site), set `baseurl: ""`.

## Adding a project

Copy `_projects/sample-project.md`, rename it, edit the front matter.
The filename becomes the URL. It files itself under the right category
and the homepage project count updates on its own.

## Files you need to drop in

| Where | What |
|---|---|
| `assets/videos/hero.mp4` | The spinning render for the homepage |
| `assets/docs/resume.pdf` | Your resume |
| `assets/images/` | Project photos and thumbnails |

## Changing the look

All five colors live at the top of `assets/css/main.css` as variables.
Change them there once, they update everywhere.

Category names, hover text, and panel colors live in `_data/categories.yml`.

## preview.html

A standalone copy of the homepage with the CSS and JS baked in.
Open it in a browser to see the design without installing Ruby.
It is excluded from the build, and you can delete it whenever.
