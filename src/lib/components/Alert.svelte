<script lang="ts">
	import { AlertTriangle, CheckCircle2 } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let message: string;
	export let success: boolean;
	export let timeout = 5000; // in milliseconds, defaults to 5000

	let visible = true;

	onMount(() => {
		const timer = setTimeout(() => {
			visible = false;
		}, timeout);

		return () => clearTimeout(timer);
	});
</script>

{#if visible}
	{#if success}
		<div
			role="alert"
			class="border-2 bg-green-100 p-4 text-green-900 shadow-[4px_4px_0_0] my-6"
		>
			<div class="flex items-start gap-3">
				<CheckCircle2 size={16} class="mt-0.5 mb-1 size-4" />
				<strong class="block flex-1 leading-tight font-semibold">
					{message}
				</strong>
			</div>
		</div>
	{:else}
		<div
			role="alert"
			class="border-2 bg-red-100 p-4 text-red-900 shadow-[4px_4px_0_0] my-6"
		>
			<div class="flex items-start gap-3">
				<AlertTriangle size={16} class="mt-0.5" />
				<strong class="block flex-1 leading-tight font-semibold">
					{message}
				</strong>
			</div>
		</div>
	{/if}
{/if}
