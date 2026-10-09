// vite.config.ts
import { defineConfig } from "file:///sessions/rcw-01mwdangewtjpdkrhfuchehm/mnt/projects/CS_IntroToHEI_IPEDS/react-app/node_modules/vite/dist/node/index.js";
import react from "file:///sessions/rcw-01mwdangewtjpdkrhfuchehm/mnt/projects/CS_IntroToHEI_IPEDS/react-app/node_modules/@vitejs/plugin-react/dist/index.js";
import { VitePWA } from "file:///sessions/rcw-01mwdangewtjpdkrhfuchehm/mnt/projects/CS_IntroToHEI_IPEDS/react-app/node_modules/vite-plugin-pwa/dist/index.js";
var BASE = "/CS_IntroToHEI_IPEDS/";
var vite_config_default = defineConfig({
  base: BASE,
  define: {
    __BUILD_TIME__: JSON.stringify((/* @__PURE__ */ new Date()).toISOString())
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "icons/apple-touch-icon.png"],
      manifest: {
        name: "Intro to HEI & IPEDS",
        short_name: "HEI & IPEDS",
        description: "Building one documented, tested HEI/IPEDS dataset for the AI courses to use in their projects.",
        theme_color: "#14324a",
        background_color: "#14324a",
        display: "standalone",
        orientation: "any",
        scope: BASE,
        start_url: BASE,
        icons: [
          { src: "icons/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/pwa-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "icons/maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,json}"],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvc2Vzc2lvbnMvcmN3LTAxbXdkYW5nZXd0anBka3JoZnVjaGVobS9tbnQvcHJvamVjdHMvQ1NfSW50cm9Ub0hFSV9JUEVEUy9yZWFjdC1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9zZXNzaW9ucy9yY3ctMDFtd2Rhbmdld3RqcGRrcmhmdWNoZWhtL21udC9wcm9qZWN0cy9DU19JbnRyb1RvSEVJX0lQRURTL3JlYWN0LWFwcC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vc2Vzc2lvbnMvcmN3LTAxbXdkYW5nZXd0anBka3JoZnVjaGVobS9tbnQvcHJvamVjdHMvQ1NfSW50cm9Ub0hFSV9JUEVEUy9yZWFjdC1hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcblxuLy8gR2l0SHViIFBhZ2VzIHByb2plY3Qgc2l0ZTogYmFzZSBNVVNUIGVxdWFsIFwiLzxSZXBvTmFtZT4vXCIuXG5jb25zdCBCQVNFID0gXCIvQ1NfSW50cm9Ub0hFSV9JUEVEUy9cIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6IEJBU0UsXG4gIGRlZmluZToge1xuICAgIF9fQlVJTERfVElNRV9fOiBKU09OLnN0cmluZ2lmeShuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkpLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbXCJmYXZpY29uLnBuZ1wiLCBcImljb25zL2FwcGxlLXRvdWNoLWljb24ucG5nXCJdLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogXCJJbnRybyB0byBIRUkgJiBJUEVEU1wiLFxuICAgICAgICBzaG9ydF9uYW1lOiBcIkhFSSAmIElQRURTXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQnVpbGRpbmcgb25lIGRvY3VtZW50ZWQsIHRlc3RlZCBIRUkvSVBFRFMgZGF0YXNldCBmb3IgdGhlIEFJIGNvdXJzZXMgdG8gdXNlIGluIHRoZWlyIHByb2plY3RzLlwiLFxuICAgICAgICB0aGVtZV9jb2xvcjogXCIjMTQzMjRhXCIsXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6IFwiIzE0MzI0YVwiLFxuICAgICAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgb3JpZW50YXRpb246IFwiYW55XCIsXG4gICAgICAgIHNjb3BlOiBCQVNFLFxuICAgICAgICBzdGFydF91cmw6IEJBU0UsXG4gICAgICAgIGljb25zOiBbXG4gICAgICAgICAgeyBzcmM6IFwiaWNvbnMvcHdhLTE5Mi5wbmdcIiwgc2l6ZXM6IFwiMTkyeDE5MlwiLCB0eXBlOiBcImltYWdlL3BuZ1wiIH0sXG4gICAgICAgICAgeyBzcmM6IFwiaWNvbnMvcHdhLTUxMi5wbmdcIiwgc2l6ZXM6IFwiNTEyeDUxMlwiLCB0eXBlOiBcImltYWdlL3BuZ1wiIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcImljb25zL21hc2thYmxlLTUxMi5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB3b3JrYm94OiB7XG4gICAgICAgIGdsb2JQYXR0ZXJuczogW1wiKiovKi57anMsY3NzLGh0bWwscG5nLHN2Zyxqc29ufVwiXSxcbiAgICAgICAgbWF4aW11bUZpbGVTaXplVG9DYWNoZUluQnl0ZXM6IDQgKiAxMDI0ICogMTAyNCxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcWEsU0FBUyxvQkFBb0I7QUFDbGMsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUd4QixJQUFNLE9BQU87QUFHYixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsSUFDTixnQkFBZ0IsS0FBSyxXQUFVLG9CQUFJLEtBQUssR0FBRSxZQUFZLENBQUM7QUFBQSxFQUN6RDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BQ2QsZUFBZSxDQUFDLGVBQWUsNEJBQTRCO0FBQUEsTUFDM0QsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFDRTtBQUFBLFFBQ0YsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLFVBQ0wsRUFBRSxLQUFLLHFCQUFxQixPQUFPLFdBQVcsTUFBTSxZQUFZO0FBQUEsVUFDaEUsRUFBRSxLQUFLLHFCQUFxQixPQUFPLFdBQVcsTUFBTSxZQUFZO0FBQUEsVUFDaEU7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLGNBQWMsQ0FBQyxpQ0FBaUM7QUFBQSxRQUNoRCwrQkFBK0IsSUFBSSxPQUFPO0FBQUEsTUFDNUM7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
