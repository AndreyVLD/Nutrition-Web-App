<script lang="ts">
	import type { Food } from '$lib/types/food';

	const foodProps: Food = $props();
	const totalCarbs = foodProps.foodNutrients.find((nutrient) => nutrient.nutrientId === 1005);

	const totalSugars = foodProps.foodNutrients.find(
		(nutrient) => nutrient.nutrientId === 2000 || nutrient.nutrientId === 1063
	);
</script>

<div class="flex w-full max-w-md flex-col rounded-lg bg-white p-4 shadow-md">
	<!-- Card Header -->
	<div class="mb-4 flex flex-col gap-1">
		<div class="m-0 text-lg font-bold">{foodProps.description}</div>
		<div class=" text-sm text-gray-600">
			<span class="font-semibold">Category:</span>
			{foodProps.foodCategory}
		</div>
		{#if foodProps.brandOwner}
			<div class="text-sm text-gray-600">
				<span class="font-semibold">Brand:</span>
				{foodProps.brandOwner}
			</div>
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
	<div class="mt-auto self-end text-sm text-gray-600">{foodProps.dataType}</div>
</div>
