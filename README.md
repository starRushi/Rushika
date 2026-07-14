# Portfolio

## If I want to run it locally

    bundle install
    bundle exec jekyll serve

Then open http://localhost:4000/Rushika

## Adding a project

Copy `_projects/sample-project.md`, rename it, edit the front matter.
The filename becomes the URL. It files itself under the right category
and the homepage project count updates on its own.

## Files I need to drop in

| Where | What |
|---|---|
| `assets/videos/hero.mp4` | The spinning render for the homepage |
| `assets/docs/resume.pdf` | My resume |
| `assets/images/` | Project photos and thumbnails |

## Changing the look

All five colors live at the top of `assets/css/main.css` as variables.
Change them there once, they update everywhere.

Category names, hover text, and panel colors live in `_data/categories.yml`.

