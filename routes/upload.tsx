import { ArrowLeftIcon } from "lucide-preact";
import { define, PHOTOS_DIR } from "../utils.ts";
import FileUpload from "../islands/FileUpload.tsx";
import Alert from "../islands/Alert.tsx";

export const handler = define.handlers({
  async POST(ctx) {
    const form = await ctx.req.formData();
    const files = form.getAll("files");

    if (files.length > 0) {
      await Deno.stat(PHOTOS_DIR);

      const savedFiles = [];

      // Process each file
      for (const file of files) {
        if (file instanceof File) {
          // Read file contents
          const arrayBuffer = await file.arrayBuffer();
          const bytes = new Uint8Array(arrayBuffer);

          // Save file to PHOTOS_DIR
          const filePath = `${PHOTOS_DIR}/${file.name}`;
          await Deno.writeFile(filePath, bytes);

          savedFiles.push({
            name: file.name,
            size: file.size,
            type: file.type,
            path: filePath,
          });

          console.log(`Saved: ${file.name} (${file.size} bytes)`);
        }
      }

      return {
        data: { success: true, message: `${files.length} files uploaded.` },
      };
    } else {
      return {
        data: {
          success: false,
          message: "Oops, something went wrong when uploading files.",
        },
      };
    }
  },
});

export default define.page<typeof handler>(function UploadPage(props) {
  const { success, message } = props.data ?? {};
  return (
    <div class="min-h-screen p-8">
      <div class="mx-auto max-w-2xl">
        <a
          href="/"
          class="mb-6 inline-flex items-center gap-2 border-4 border-black bg-white px-6 py-3 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
        >
          <ArrowLeftIcon size={24} class="text-black" strokeWidth={3} />
          Back home
        </a>

        <h1 class="mb-8 border-4 border-black bg-white p-6 text-4xl font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          Upload Files
        </h1>
        {message && <Alert message={message} success={success} />}

        <FileUpload />
      </div>
    </div>
  );
});
