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
      includeAssets: [
        "offline.html",
        "dark_logo_circled.png",
        "dark_logo_text-rbg.png",
      ],
      workbox: {
        navigateFallback: "/offline.html",
        runtimeCaching: [
          {
            urlPattern: /\/dashboard\/overview/,
            handler: "NetworkFirst",
            options: {
              cacheName: "dashboard-cache",
              networkTimeoutSeconds: 3,
            },
          },
        ],
      },
      manifest: {
        name: "FlowUnit",
        short_name: "FU",
        start_url: "/dashboard/overview",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#757E8D",
        icons: [
          {
            src: "/dark_logo_text-rbg.png",
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
