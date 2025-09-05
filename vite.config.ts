import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { devFsVitePlugin } from "bknd/adapter/cloudflare";

export default defineConfig({
   clearScreen: false,
   plugins: [
      cloudflare(),
      devFsVitePlugin({
         /**
          * Since we're not using `bknd.config.ts` because of the platform proxy,
          * we need to specify the config file that contains the writing plugins.
          */
         configFile: "config.ts",
      }),
   ],
   build: {
      minify: true,
   },
});
