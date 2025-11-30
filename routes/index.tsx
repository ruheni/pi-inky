import { define, formatDate, formatSize, PHOTOS_DIR } from "../utils.ts";

import DeleteButton from "../islands/DeleteButton.tsx";

export const handler = define.handlers({
  async GET() {
    await Deno.stat(PHOTOS_DIR);

    const photos = [];
    for await (const entry of Deno.readDir(PHOTOS_DIR)) {
      if (entry.isFile) {
        const ext = entry.name.split(".").pop()?.toLowerCase();
        if (
          ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "heic"
        ) {
          const stat = await Deno.stat(`${PHOTOS_DIR}/${entry.name}`);

          photos.push({
            name: entry.name,
            size: stat.size,
            modified: stat.mtime,
            url: `/p/${encodeURIComponent(entry.name)}`,
          });
        }
      }
    }

    // Sort by modified date, newest first
    photos.sort((a, b) => {
      const timeA = a.modified ? new Date(a.modified).getTime() : 0;
      const timeB = b.modified ? new Date(b.modified).getTime() : 0;
      return timeB - timeA;
    });

    return {
      data: {
        photos,
      },
    };
  },
});

export default define.page<typeof handler>(function Home(props) {
  const { photos } = props.data;
  return (
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <h1 class="text-4xl md:text-5xl font-heading mb-8 text-foreground">
        Photo Gallery
      </h1>

      {photos.length === 0
        ? (
          <div class="bg-secondary-background border-4 border-border p-8 text-center shadow-shadow">
            <h2 class="text-3xl font-heading mb-2">No photos found.</h2>
            <p class="text-foreground">Upload your first photo!</p>
          </div>
        )
        : (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {photos.map((photo) => (
              <div
                key={photo.name}
                class="bg-secondary-background border-4 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all duration-150 group"
              >
                <div class="aspect-square overflow-hidden bg-main/10">
                  <img
                    src={photo.url}
                    alt={photo.name}
                    loading="lazy"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div class="p-4 border-t-4 border-border bg-main">
                  <div class="font-heading text-sm md:text-base text-main-foreground truncate mb-2">
                    {photo.name}
                  </div>
                  <div class="flex justify-between text-xs md:text-sm text-main-foreground/80 mb-3">
                    <span>{formatSize(photo.size)}</span>
                    <span>
                      {formatDate(photo.modified?.toISOString() ?? null)}
                    </span>
                  </div>
                  <div class="flex justify-end">
                    <DeleteButton photoName={photo.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
});
