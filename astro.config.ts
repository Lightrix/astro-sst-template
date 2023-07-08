// @ts-nocheck
import worker from "astrojs-service-worker";
import { defineConfig } from "astro/config";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import critters from "astro-critters";
import aws from "astro-sst/lambda";
import rome from "astro-rome";

export default defineConfig({
	// TODO Place your site URL here
	// site: "",
	output: "server",
	adapter: aws(),
	experimental: {
		assets: true,
	},
	compressHTML: true,
	integrations: [
		import.meta.env.MODE === "production" ? worker() : null,
		sitemap(),
		critters({ logger: 1 }),
		prefetch(),
		rome({ logger: 1 }),
		compress({ logger: 1 }),
	],
	vite: {
		build: {
			sourcemap: true,
		},
	},
});
