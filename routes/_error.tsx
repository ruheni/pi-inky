import { HttpError, PageProps } from "fresh";

export default function ErrorPage(props: PageProps) {
  const error = props.error;

  if (error instanceof HttpError) {
    const status = error.status;

    if (status === 404) {
      return (
        <div class="min-h-screen bg-background flex items-center justify-center p-4">
          <div class="max-w-2xl w-full">
            {/* Main error box */}
            <div class="bg-main border-4 border-border shadow-shadow p-8 mb-6">
              <div class="text-center">
                <div class="text-9xl font-heading mb-4 text-main-foreground">
                  404
                </div>
                <h1 class="text-4xl md:text-5xl font-heading mb-4 text-main-foreground uppercase">
                  Page Not Found
                </h1>
                <p class="text-xl font-base text-main-foreground mb-6">
                  Oops! The page you're looking for doesn't exist.
                </p>
              </div>
            </div>

            {/* Action button */}
            <div class="text-center">
              <a
                href="/"
                class="inline-block bg-secondary-background text-foreground border-4 border-border shadow-shadow px-8 py-4 text-xl font-heading uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                Go Back Home
              </a>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div class="min-h-screen bg-background flex items-center justify-center p-4">
      <div class="max-w-2xl w-full">
        {/* Main error box */}
        <div class="bg-main border-4 border-border shadow-shadow p-8 mb-6">
          <div class="text-center">
            <div class="text-7xl font-heading mb-4 text-main-foreground">
              ⚠️
            </div>
            <h1 class="text-4xl md:text-5xl font-heading mb-4 text-main-foreground uppercase">
              Something Went Wrong
            </h1>
            <p class="text-xl font-base text-main-foreground mb-6">
              An unexpected error occurred. Please try again later.
            </p>
          </div>
        </div>

        {/* Action button */}
        <div class="text-center">
          <a
            href="/"
            class="inline-block bg-secondary-background text-foreground border-4 border-border shadow-shadow px-8 py-4 text-xl font-heading uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}
