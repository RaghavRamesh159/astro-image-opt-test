import { defineConfig } from 'astro/config';

// Plain Astro app. Add YOUR adapter here (it handles image optimization):
//   import myAdapter from '...';
//   export default defineConfig({ output: 'server', adapter: myAdapter(), ... });
export default defineConfig({
  image: {
    // Allow remote images to be optimized. Tighten to your CDN host if you like.
    remotePatterns: [{ protocol: 'https' }],
  },
});
