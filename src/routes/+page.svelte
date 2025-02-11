<script lang="ts">
	import FoodItem from '$lib/components/FoodItem.svelte';
	import InputForm from '$lib/components/InputForm.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
	let foodList = $derived(form?.foodResponse?.foods ?? []);
</script>

<div class="mt-5 flex flex-col items-center">
	<h1 class="text-lg">An interesting search engine</h1>
	<InputForm />
	<div class="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each foodList ?? [] as food}
			<FoodItem {...food}></FoodItem>
		{/each}
	</div>
</div>
