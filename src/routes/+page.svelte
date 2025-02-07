<script lang="ts">
	import InputForm from '$lib/components/InputForm.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
	
</script>

<div class="flex flex-col items-center mt-5">
	<h1 class="text-lg">An interesting search engine</h1>
	<InputForm />
	{#each form?.people ?? [] as person}
		<li>{person.name}</li>
	{/each}
</div>
