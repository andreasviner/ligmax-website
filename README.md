# Ligmax — Team Website

Official website for **Team Ligmax**, an autonomous surface vessel team from the NTNU
Department of Electronic Systems, competing at [Njord — The Autonomous Ship
Challenge](https://www.njordchallenge.com/) 2026. Live at [ligmax.no](https://ligmax.no).

Built with [Astro](https://astro.build) — fully static output, no server required.

## Commands

| Command           | Action                                            |
| ----------------- | ------------------------------------------------- |
| `npm install`     | Install dependencies                              |
| `npm run dev`     | Local dev server at `localhost:4321`              |
| `npm run build`   | Production build to `./dist/`                     |
| `npm run preview` | Preview the production build locally              |
| `npm run deploy`  | Build and deploy to Cloudflare Pages via Wrangler |

## Deploying to Cloudflare (ligmax.no)

### Option A — Git integration (recommended)

1. Push this repo to GitHub/GitLab.
2. In the [Cloudflare dashboard](https://dash.cloudflare.com): **Workers & Pages → Create → Pages → Connect to Git**.
3. Settings: framework preset **Astro**, build command `npm run build`, output directory `dist`.
4. After the first deploy: **Custom domains → Add** `ligmax.no` (and `www.ligmax.no`).
   Since the domain's DNS is on Cloudflare, the records are created automatically.

Every push to the main branch then deploys automatically.

### Option B — Direct upload from this machine

```sh
npx wrangler login          # once
npm run deploy              # builds and uploads ./dist
```

Then add the custom domain in the Pages project settings as above.

## Updating content

- **Copy & sections** — components live in `src/components/` (one per page section).
- **Specs** — edit the `specs` array in `src/components/Vessel.astro`.
- **Team** — edit `src/components/Team.astro` (members are listed in alphabetical order).
- **Contact email** — set in `src/components/Sponsor.astro` and `src/components/Footer.astro`
  (currently `andreas.e.lindeman@gmail.com`).
- **3D explorer part descriptions** — edit `src/data/part-info.json`. Every clickable part of the
  model has an entry keyed by its part ID (shown in the inspector panel on `/vessel`); fill in
  `title` (display name) and `description`. Empty fields fall back to the raw ID and a
  "write-up coming soon" note.
- **Images** — drop files in `src/assets/` and import them; Astro optimises them at build time.
- **3D model** — `public/models/ligmax.glb`, Draco-compressed from the CAD export via
  `npx @gltf-transform/cli optimize <in.glb> public/models/ligmax.glb --compress draco --texture-compress webp`.
- **Technical report PDF** — `public/docs/ligmax-technical-report-2026.pdf`.
- **Social preview image** — regenerate with `node scripts/generate-og.mjs` after changing the render.

Source material (original renders, PDFs, CAD export) is kept in `source-material/` and is not
part of the build.
