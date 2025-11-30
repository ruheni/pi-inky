import { UploadIcon } from "lucide-preact";
import { useSignal } from "@preact/signals";

export default function FileUpload() {
  const isDragging = useSignal(false);
  const files = useSignal<File[]>([]);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = true;
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = false;
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = false;

    const droppedFiles = Array.from(e.dataTransfer?.files || []);
    const imageFiles = droppedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length > 0) {
      files.value = [...files.value, ...imageFiles];
    }
  };

  const handleFileInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const selectedFiles = Array.from(input.files || []);

    if (selectedFiles.length > 0) {
      files.value = [...files.value, ...selectedFiles];
    }
  };

  const removeFile = (index: number) => {
    files.value = files.value.filter((_, i) => i !== index);
  };

  return (
    <form action="/upload" method="post" encType="multipart/form-data">
      <label
        for="files"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        class={`flex cursor-pointer flex-col items-center border-4 border-black bg-white p-8 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:p-12 ${
          isDragging.value ? "bg-cyan-100 scale-105" : ""
        }`}
      >
        <div class="rounded-full border-4 border-black bg-cyan-400 p-6">
          <UploadIcon size={64} class="text-black" strokeWidth={3} />
        </div>

        <span class="mt-6 text-2xl font-black uppercase tracking-tight">
          Drag & Drop or Click
        </span>

        <span class="mt-3 text-sm font-bold uppercase text-gray-700">
          Select image files to upload
        </span>

        <div class="mt-6 border-4 border-black bg-amber-400 px-8 py-3 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
          Browse Files
        </div>

        <input
          accept="image/jpeg,image/png,image/jpg"
          type="file"
          id="files"
          name="files"
          class="sr-only"
          multiple
          onChange={handleFileInput}
        />
      </label>

      {files.value.length > 0 && (
        <div class="mt-8">
          <h2 class="mb-4 border-4 border-black bg-white p-4 text-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Selected Files ({files.value.length})
          </h2>

          <div class="space-y-3">
            {files.value.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                class="flex items-center justify-between border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div class="flex items-center gap-4">
                  <div class="h-24 w-24 border-2 border-black">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      class="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p class="font-bold text-black">{file.name}</p>
                    <p class="text-sm font-medium text-gray-600">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  class="border-4 border-black bg-red-400 px-4 py-2 font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            class="mt-6 w-full border-4 border-black bg-green-400 px-8 py-4 text-xl font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            Upload {files.value.length}{" "}
            File{files.value.length !== 1 ? "s" : ""}
          </button>
        </div>
      )}
    </form>
  );
}
