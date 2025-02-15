<script lang="ts">
	import FoodItem from '$lib/components/FoodItem.svelte';
	import InputForm from '$lib/components/InputForm.svelte';
	import PaginationNav from '$lib/components/PaginationNav/PaginationNav.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
	let currentPage = $state(1);
	let query = $state('');
	let loading = $state(false);

	let foodList = $derived(form?.foodResponse?.foods ?? []);
	let totalPages = $derived(form?.foodResponse?.totalPages ?? 0);
</script>

<div class="mb-5 mt-5 flex flex-col items-center">
	<InputForm bind:query bind:currentPage bind:loading />
	<PaginationNav {query} {totalPages} bind:currentPage bind:loading />
	<div
		class="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
	>
		{#each foodList as food}
			<FoodItem {...food}></FoodItem>
		{/each}
	</div>
	<PaginationNav {query} {totalPages} bind:currentPage bind:loading />
</div>
