<script lang="ts">
	import type { PageData } from './$types';
	import DeleteButton from '$lib/components/DeleteButton.svelte';
	import { formatSize, formatDate } from '$lib/utils';

	export let data: PageData;
	$: ({ photos } = data);
</script>

<div class="container mx-auto px-4 py-8 max-w-7xl">
	<div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
		<h1 class="text-4xl md:text-5xl font-heading mb-8 text-foreground">Photo Gallery</h1>
		<a
			href="/upload"
			class="mb-6 inline-flex items-center gap-2 border-4 border-black bg-white px-6 py-3 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
		>
			Upload New Photo
		</a>
	</div>

	{#if photos.length === 0}
		<div class="bg-secondary-background border-4 border-border p-8 text-center shadow-shadow">
			<h2 class="text-3xl font-heading mb-2">No photos found.</h2>
			<p class="text-foreground">Upload your first photo!</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
			{#each photos as photo (photo.name)}
				<div
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
							<span>{formatDate(photo.modified)}</span>
						</div>
						<div class="flex justify-end">
							<DeleteButton photoName={photo.name} />
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
