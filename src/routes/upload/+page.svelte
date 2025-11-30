<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="min-h-screen p-8">
	<div class="mx-auto max-w-2xl">
		<a
			href="/"
			class="mb-6 inline-flex items-center gap-2 border-4 border-black bg-white px-6 py-3 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
		>
			<ArrowLeft size={24} class="text-black" strokeWidth={3} />
			Back home
		</a>

		<h1
			class="mb-8 border-4 border-black bg-white p-6 text-4xl font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
		>
			Upload Files
		</h1>

		{#if form?.message}
			<Alert message={form.message} success={form.success ?? false} />
		{/if}

		<FileUpload />
	</div>
</div>
