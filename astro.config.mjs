import { defineConfig } from "astro/config";
import { amplifyAdapter } from "@amzn/omega-astro-adapter/integration";

export default defineConfig({
  output: "server",
  adapter: amplifyAdapter(),
  image: { domains: ["images.example.com"] },
});
