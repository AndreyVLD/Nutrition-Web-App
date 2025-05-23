<!-- This component provides a card to display food information in the list. -->

<script lang="ts">
	import type { Food } from '$lib/types/food';

	/**
	 * FoodItem component for displaying food information in a card format.
	 * @param {string} fdcId - The FDC ID of the food item.
	 * @param {string} description - The description of the food item.
	 * @param {string} dataType - The data type of the food item.
	 * @param {string} foodCategory - The category of the food item.
	 * @param {string} [brandOwner] - Optional brand owner of the food item.
	 * @param {Array<{ nutrientId: number; value: number; unitName: string }>} foodNutrients - The nutrients of the food item.
	 */
	const { fdcId, description, dataType, foodCategory, brandOwner, foodNutrients }: Food = $props();

	// Find the total carbohydrates and sugars in the food nutrients using nutrient IDs
	const totalCarbs = foodNutrients.find((nutrient) => nutrient.nutrientId === 1005);

	const totalSugars = foodNutrients.find(
		(nutrient) => nutrient.nutrientId === 2000 || nutrient.nutrientId === 1063
	);
</script>

<a
	class="flex w-full max-w-md flex-col rounded-lg bg-white p-4 shadow-md
			transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-50 hover:shadow-lg"
	href={`/food/${fdcId}`}
	rel="noopener noreferrer"
	target="_blank"
>
	<!-- Card Header -->
	<div class="mb-4 flex flex-col gap-1">
		<div class="m-0 text-lg font-bold">{description}</div>
		<div class="text-sm text-gray-600">
			<span class="font-semibold">Category:</span>
			{foodCategory}
		</div>
		{#if brandOwner}
			<div class="text-sm text-gray-600">
				<span class="font-semibold">Brand:</span>
				{brandOwner}
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
	<div class="mt-auto self-end text-sm text-gray-600">{dataType}</div>
</a>
