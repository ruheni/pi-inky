import { define, PHOTOS_DIR } from "../../utils.ts";

export const handler = define.handlers({
  async GET(ctx) {
    let { filename } = ctx.params;

    if (!filename) {
      return new Response("Not found", { status: 404 });
    }

    filename = decodeURIComponent(filename);

    if (filename.includes("..") || filename.includes("/")) {
      return new Response("Forbidden", { status: 403 });
    }

    const filePath = `${PHOTOS_DIR}/${filename}`;

    try {
      const file = await Deno.open(filePath);
      const stat = await Deno.stat(filePath);

      const ext = filename.split(".").pop()?.toLowerCase();
      const contentTypes: Record<string, string> = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        heic: "image/heic",
      };

      const contentType = ext
        ? contentTypes[ext] || "application/octet-stream"
        : "application/octet-stream";

      return new Response(file.readable, {
        headers: {
          "content-type": contentType,
          "content-length": String(stat.size),
          "cache-control": "public, max-age=31536000, immutable",
        },
      });
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        return new Response("Not found", { status: 404 });
      }
      console.error("Error serving file:", error);
      return new Response("Internal server error", { status: 500 });
    }
  },
});
