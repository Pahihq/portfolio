import { resolve } from "path";
import { defineConfig } from "vite";

const projectSlugs = [
  "redefine-foods",
  "alienography",
  "neighborhood-design",
  "park-me",
  "atoms",
  "miller-knoll",
  "spy",
  "qahira",
  "go-go",
  "wagging-hearts",
  "related-department",
  "blue-dragon",
  "conversation",
  "seen-and-unseen",
];

const projectInputs = Object.fromEntries(
  projectSlugs.map((slug) => [slug, resolve(__dirname, slug, "index.html")])
);

export default defineConfig({
  base: "/portfolio/",
  appType: "mpa",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        playground: resolve(__dirname, "playground.html"),
        notFound: resolve(__dirname, "404.html"),
        ...projectInputs,
      },
    },
  },
});
