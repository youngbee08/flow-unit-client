import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["dark_logo_circled.png", "dark_logo_text-rbg.png"],
      manifest: {
        name: "FlowUnit",
        short_name: "FlowUnit",
        description:
          "FlowUnit is a team management solution designed to streamline team collaboration and productivity. It brings projects, tasks, and communication together in a single, intuitive workspace, empowering teams to work efficiently and stay aligned.",
        start_url: "/dashboard/overview",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#757E8D",
        icons: [
          {
            src: "/dark_logo_circled.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/dark_logo_circled.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: { host: true },
});
