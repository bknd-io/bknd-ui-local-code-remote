import { createApp } from "bknd/adapter/cloudflare";
import config from "../config";
import { App } from "bknd";

/**
 * We could simply return the `serve` function, but since we're using code,
 * there are no race conditions that apply to db-stored config.
 *
 * Therefore we use the other approach of reusing the app across requests in production.
 */
//export default serve(config);

let app: App;
export default {
   async fetch(request: Request, env: Env, ctx: ExecutionContext) {
      const prod = env.ENVIRONMENT !== "development";
      if (!prod || !app) {
         app = await createApp(config, { request, env, ctx });
      }

      return app.fetch(request, env, ctx);
   },
};
