<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="min-h-screen flex items-center justify-center p-8">
	<div class="border-4 border-black bg-red-400 p-8 max-w-lg shadow-shadow">
		<h1 class="text-4xl font-heading mb-4">
			{$page.status === 404 ? 'Page Not Found' : 'Error'}
		</h1>
		<p class="text-lg mb-6">{$page.error?.message || 'Something went wrong'}</p>
		<a
			href="/"
			class="inline-block border-4 border-black bg-white px-6 py-3 font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
		>
			Go Home
		</a>
	</div>
</div>
