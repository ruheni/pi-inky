import { define, PHOTOS_DIR } from "../../utils.ts";

export const handler = define.handlers({
  async DELETE(ctx) {
    const { filename: fileName } = await ctx.req.json();

    try {
      await Deno.stat(`${PHOTOS_DIR}/${fileName}`);

      await Deno.remove(`${PHOTOS_DIR}/${fileName}`);

      return ctx.json({
        data: {
          message: "Photo deleted successfully.",
          success: true,
        },
      });
    } catch (error) {
      console.error("Error occurred:", error);
      if (error instanceof Deno.errors.NotFound) {
        console.error("File not found:", fileName);
        return ctx.json({
          data: {
            message: "File not found.",
            success: false,
          },
        });
      }
      return ctx.json({
        data: {
          message: "An error occurred while deleting the photo.",
          success: false,
          error: error instanceof Error ? error.message : String(error),
        },
      });
    }
  },
});
