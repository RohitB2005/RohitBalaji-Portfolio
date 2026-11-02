# Rohit Balaji — Portfolio

Personal portfolio site: **https://rohit-balaji-portfolio.vercel.app**

Plain HTML, CSS and JavaScript with no framework and no build step. It's deployed on Vercel straight from this repo.

## Run it locally

```sh
python3 -m http.server 5509
# then open http://localhost:5509
```

Any static server works.

## Files

| Path | What it is |
|---|---|
| `index.html` | All page content: hero, tech logos, skills, projects, contact |
| `style.css` | All styles. Theme colours are CSS variables at the top (`:root` for dark, `body.light-mode` for light) |
| `script.js` | Nav menu and theme toggle, the certificates (data array + 3D stack + modal), hero typing animation, tech carousel |
| `fonts/` | Self-hosted Quicksand and Orbitron (SIL OFL, licences included) |
| `images/` | Shipped images. Sources live in `images/originals/`, which is git-ignored |
| `404.html`, `vercel.json` | Not-found page and cache headers for Vercel |
| `favicon.*`, `apple-touch-icon.png`, `images/og.jpg` | Tab icons and the link-preview image |

## How to add things

### A project

Copy an existing `.project-card` block in `index.html` and edit it:

```html
<div class="project-card">
    <img src="images/NAME.jpg" alt="What the screenshot shows" class="project-image" width="1200" height="HEIGHT" loading="lazy" decoding="async">
    <div class="project-info">
        <h3>Name — Short Description</h3>
        <p>70–90 words, so cards in a row stay roughly even.</p>
        <div class="project-tech-list">
            <span>Tag</span>
            <span>Tag</span>
        </div>
        <div class="project-links">
            <a href="https://…" target="_blank" rel="noopener" class="project-button" data-tooltip="example.com/…">Live App</a>
        </div>
    </div>
</div>
```

- Featured projects sit three to a row on desktop. Keep the count a multiple of 3 and move older work to "Also built" (`.project-card-compact`), so the last row never has a lone card.
- Tags wrap in balanced rows automatically. Check that no tag ends up alone on a row.
- Up to three buttons fit; three switch to a compact layout automatically.

### A certificate

Add an entry to the `certificates` array at the top of the certifications section in `script.js`:

```js
{
    id: 6,
    color: "#1a73e8",                 // card colour
    provider: "Provider",
    title: "Certificate Title",
    credentialId: "ABC123",
    credentialLink: "https://…",
    logoSrc: "images/Provider.png",
    mediaLinks: ["images/providercerts/1.jpg", "images/providercerts/2.jpg"],
    courses: ["Course One"]
}
```

- `mediaLinks`: for a specialization, put the overall certificate first, then one image per course. The modal's alt text relies on that order.
- Every image needs a 400px-wide copy with the same name in a `thumbs/` folder beside it (e.g. `images/providercerts/thumbs/1.jpg`), used by the modal grid.
- The grid picks its column count from the number of certificates, so a row never ends on a single card.

### An award pill (hero)

```html
<li><span class="aw-mark">Winner</span> Event Name <span class="aw-sub">2026</span></li>
```

Three pills fill one row on desktop. A fourth would wrap three-plus-one, so decide how the row should look before adding it.

### A tech logo

Add a `.tech-card` inside `.tech-ring` with a 140×140 transparent PNG. Keep `alt=""`, because the caption already names it. The 3D ring copes with up to about 20 logos. On phones, tablets and reduced-motion, the flat grid shows five per row (three on phones), so 15 logos make even rows.

## Images

Sources go in `images/originals/`. Shipped files are generated from them, never re-compressed from the shipped copy (macOS `sips` shown):

```sh
# project screenshots: 1200px wide, JPEG quality 80
sips -Z 1200 -s format jpeg -s formatOptions 80 images/originals/NAME.png --out images/NAME.jpg

# certificate thumbnails: 400px wide
sips -Z 400 -s format jpeg -s formatOptions 80 images/originals/providercerts/1.jpg --out images/providercerts/thumbs/1.jpg
```

Set the `<img>` `width`/`height` attributes to the output size so the page doesn't shift while images load.

## Before pushing

- Check 1470×800, 1280, 768 and 390 wide, in both themes, on a fresh load.
- The whole About text should be visible at 1470×800.
- No lone tags or cards on a row; neighbouring cards look consistent.
- The browser console is clean. Locally, the only expected error is the analytics script (`/_vercel/insights/script.js`), which exists only on Vercel.
