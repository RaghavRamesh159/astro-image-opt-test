import type { APIContext } from "astro";

// On-demand revalidation endpoint. Both tag- and path-based invalidation map to
// the Omega PurgeCache data-plane API (hard purge).
//
//   GET /api/revalidate?tags=products,product:1  -> cache.invalidate({ tags })
//   GET /api/revalidate?path=/products/1         -> cache.invalidate({ path })
export const prerender = false;

export async function GET(context: APIContext): Promise<Response> {
  const url = new URL(context.request.url);
  const tagsParam = url.searchParams.get("tags");
  const path = url.searchParams.get("path");

  if (tagsParam) {
    await context.cache.invalidate({ tags: tagsParam.split(",") });
  }
  if (path) {
    await context.cache.invalidate({ path });
  }

  return new Response(
    JSON.stringify({
      invalidated: { tags: tagsParam ?? null, path: path ?? null },
    }),
    { status: 200, headers: { "content-type": "application/json" } },
  );
}
