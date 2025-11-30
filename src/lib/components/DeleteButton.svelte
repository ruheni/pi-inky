<script lang="ts">
	import { Trash2 } from 'lucide-svelte';
	import { invalidateAll } from '$app/navigation';

	export let photoName: string;

	async function handleDelete() {
		if (confirm(`Delete ${photoName}?`)) {
			try {
				const response = await fetch('/api/delete', {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ filename: photoName })
				});

				if (response.ok) {
					await invalidateAll();
				}
			} catch (error) {
				console.error('Delete error:', error);
			}
		}
	}
</script>

<button
	type="button"
	class="bg-red-400 text-foreground border-4 border-border font-heading p-2 shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150 flex items-center justify-center"
	on:click={handleDelete}
	aria-label="Delete {photoName}"
>
	<Trash2 size={18} />
</button>
