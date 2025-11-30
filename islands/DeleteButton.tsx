import { Trash2 } from "lucide-preact";

interface DeleteButtonProps {
  photoName: string;
}

export default function DeleteButton({ photoName }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (confirm(`Delete ${photoName}?`)) {
      try {
        await fetch("/api/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filename: photoName }),
        });
      } catch (error) {
        console.error("Delete error:", error);
        
      }
    }
  };

  return (
    <button
      type="button"
      class="bg-red-400 text-foreground border-4 border-border font-heading p-2 shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150 flex items-center justify-center"
      onClick={handleDelete}
      aria-label={`Delete ${photoName}`}
    >
      <Trash2 size={18} />
    </button>
  );
}
