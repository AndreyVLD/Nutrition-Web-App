<script lang="ts">
	import type { Food } from '$lib/types/food';

	const foodProps: Food = $props();
	const totalCarbs = foodProps.foodNutrients.find((nutrient) => nutrient.nutrientId === 1005);

	const totalSugars = foodProps.foodNutrients.find(
		(nutrient) => nutrient.nutrientId === 2000 || nutrient.nutrientId === 1063
	);
</script>

<div class="w-full max-w-md rounded-lg bg-white p-4 shadow-md">
	<!-- Card Header -->
	<div class="mb-4">
		<div class="m-0 text-lg font-bold">{foodProps.description}</div>
		<div class="mb-3 mt-1 text-sm text-gray-600">{foodProps.foodCategory}</div>
		{#if foodProps.brandOwner}
			<div class="mb-3 mt-1 text-sm text-gray-600">{foodProps.brandOwner}</div>
		{/if}
	</div>

	<!-- Card Body -->
	<div class="flex flex-col gap-2">
		<span class="font-bold text-blue-800"
			>Total Carbs: {totalCarbs?.value} {totalCarbs?.unitName}</span
		>
		{#if totalSugars}
			<span class="font-bold text-red-600"
				>Total Sugars: {totalSugars.value} {totalSugars.unitName}</span
			>
		{/if}
	</div>
</div>
