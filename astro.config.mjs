import { defineConfig } from "astro/config";
import { amplifyAdapter } from "@omega/astro-adapter/integration";

// The Omega Astro adapter is a published npm package. `amplifyAdapter()` hooks
// into the Astro build pipeline and, on Astro >= 7, configures the Omega cache
// provider so that `Astro.cache.set()` emits edge ISR headers and
// `cache.invalidate()` routes to the Omega PurgeCache data-plane API.
export default defineConfig({
  output: "server",
  adapter: amplifyAdapter(),
  // Keep Astro's default (sharp) image service configured. The adapter logs a
  // benign build-time notice that it does not run sharp itself — image
  // optimization is performed at the edge by Omega via the generated `/_image`
  // route in the deployment manifest. Configuring a passthrough/noop service
  // here would make the adapter drop image settings and omit that route, which
  // would disable Omega image optimization, so we intentionally do not do that.
  image: {
    // Allow optimizing a remote image so the /images page can exercise both
    // local (bundled asset) and remote optimization paths. The Omega manifest
    // requires a hostname on each remote pattern.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  redirects: {
    // Config-level redirects become redirect route targets in the manifest.
    "/old-home": "/",
    "/redirect-test": "/routing-target",
    "/promo": "/products/1",
  },
});
