import { App, csrf, staticFiles } from "fresh";
import { type State } from "./utils.ts";

export const app = new App<State>();

app.use(staticFiles());

app.use(csrf({
  origin: ["http://localhost:8000", "http://localhost:5173"],
}));

app.onError("*", (ctx) => {
  console.log(`An error occurred: ${ctx.error}`);
  return new Response("Internal Server Error", {
    status: 500,
    statusText: ctx.error instanceof Error
      ? ctx.error.message
      : String(ctx.error),
  });
});

app.fsRoutes();
