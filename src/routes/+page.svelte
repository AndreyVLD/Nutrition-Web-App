<script lang="ts">
	import FoodItem from '$lib/components/FoodItem.svelte';
	import InputForm from '$lib/components/InputForm.svelte';
	import PaginationNav from '$lib/components/PaginationNav/PaginationNav.svelte';
	import ExportButton from '$lib/components/ExportButton/ExportButton.svelte';
	import type { PageProps } from './$types';
	import { exportCSV, exportJSON } from '$lib/export';

	let { form }: PageProps = $props();
	let currentPage = $state(1);
	let query = $state('');
	let loading = $state(false);

	let foodList = $derived(form?.foodResponse?.foods ?? []);
	let totalPages = $derived(form?.foodResponse?.totalPages ?? 0);
</script>

<div class="mb-5 flex flex-col items-center">
	<InputForm bind:currentPage bind:loading bind:query />
	{#if totalPages}
		<div class="relative mt-4 flex w-full items-center justify-center">
			<div class="absolute left-0 ml-4">
				<ExportButton
					exportFunc={(format: 'csv' | 'json') => {
						if (format === 'csv') {
							// Handle CSV export
							exportCSV(foodList);
						} else if (format === 'json') {
							// Handle JSON export
							exportJSON(foodList);
						}
					}}
					label="Export Food List"
				/>
			</div>
			<PaginationNav bind:currentPage bind:loading {query} {totalPages} />
		</div>
	{/if}

	<div
		class="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
	>
		{#each foodList as food}
			<FoodItem {...food}></FoodItem>
		{/each}
	</div>
	<PaginationNav bind:currentPage bind:loading {query} {totalPages} />
</div>
