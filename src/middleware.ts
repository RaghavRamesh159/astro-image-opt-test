import { defineMiddleware } from "astro:middleware";

// Runtime redirect: /redirect-test → 301 to /routing-target
// Runtime rewrite: /rewrite-test → served content of /routing-target (URL stays the same)
// Middleware test: /middleware-test → rewrite to /middleware-target
//   If middleware runs, /middleware-test serves middleware-target content.
//   If middleware does NOT run, /middleware-test 404s (no page at that path).
export const onRequest = defineMiddleware((context, next) => {
  if (context.url.pathname === "/redirect-test") {
    return context.redirect("/routing-target", 301);
  }
  if (context.url.pathname === "/rewrite-test") {
    return context.rewrite("/routing-target");
  }
  if (context.url.pathname === "/middleware-test") {
    return context.rewrite("/middleware-target");
  }
  return next();
});
