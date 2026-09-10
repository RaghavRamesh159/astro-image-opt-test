# astro-image-opt-test

A plain Astro app that exercises image optimization so you can run it under **your
adapter/optimizer** and confirm images get resized/reformatted.

## What it exercises

`src/pages/index.astro` renders six cases:

1. **Local `<Image>`** — auto format/width.
2. **Responsive `<Image widths=[...]>`** — `srcset` with 400/800/1200w.
3. **`<Picture formats=[avif,webp]>`** — modern format negotiation + fallback.
4. **Explicit `getImage()`** — prints the generated image URL/attrs so you can see
   exactly what your optimizer receives.
5. **Remote image** — off-origin optimization (point `REMOTE_IMAGE_URL` at your CDN).
6. **Baseline** — the raw, unoptimized 1200×800 / ~381 KB PNG for byte comparison.

Source asset `src/assets/source-1200x800.png` is a real 1200×800 RGB gradient
(generated, no network) so responsive downscaling is observable.

## Wire in your adapter

Add your adapter in `astro.config.mjs` (this is what handles optimization):

```js
import myAdapter from '...';
export default defineConfig({
  output: 'server',
  adapter: myAdapter(),
  image: { remotePatterns: [{ protocol: 'https' }] },
});
```

## Run

```bash
npm install
npm run dev            # http://localhost:4321
# or:
npm run build && npm run preview
```

> Note: could not be built on the Cloud Desktop it was scaffolded on — that host's
> glibc (2.26) is too old for the Node 20 binary (`GLIBC_2.27/2.28 not found`).
> Run on a supported Node (18.20.8+/20.3+/22+).

## How to tell optimization worked

- **Network tab:** optimized images come back as `image/webp`/`avif` and far smaller
  than the 381 KB baseline (case 6).
- **View source:** case 2 has a multi-candidate `srcset`; case 3 is a `<picture>`
  with `avif`/`webp` `<source>`s; case 4 prints the exact optimized `src`.
- Point `REMOTE_IMAGE_URL=https://your-cdn/...` to verify remote optimization too.
