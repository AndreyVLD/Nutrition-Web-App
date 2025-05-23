<!-- This component provides the table of foods displayed in the user's dashboard  -->

<script lang="ts">
	import { RELEVANT_NUTRIENTS } from '$lib/export';
	import type { FoodNutrient } from '$lib/types/food';
	import { enhance } from '$app/forms';

	/**
	 * FoodTable component for displaying a table of food items.
	 * @param {Array} favorites - The list of favorite food items.
	 */
	const { favorites } = $props();

	/**
	 * Retrieves the value of a specific nutrient from the food nutrients array.
	 * @param nutrients - The array of food nutrients.
	 * @param name - The name of the nutrient to retrieve.
	 * @returns - The value of the nutrient or '-' if not found.
	 */
	function getNutrientValue(nutrients: FoodNutrient[], name: string) {
		const found = nutrients.find((n) => n.nutrientName === name);
		return found ? `${found.value} ${found.unitName}` : '-';
	}
</script>

<table class="mb-8 min-w-full table-auto rounded-lg border bg-white p-6 shadow">
	<thead>
		<tr>
			<th class="border px-4 py-2">FDC ID</th>
			<th class="border px-4 py-2">Description</th>
			<th class="border px-4 py-2">Category</th>
			{#each RELEVANT_NUTRIENTS.map((nutrient) => nutrient.key) as key}
				<th class="border px-4 py-2">{key}</th>
			{/each}
			<th class="border px-4 py-2">Date Added</th>
			<th class="border px-4 py-2">Actions</th>
		</tr>
	</thead>

	<tbody>
		{#each favorites as fav}
			<tr>
				<td class="border px-4 py-2">{fav.food.fdcId}</td>
				<td class="border px-4 py-2">{fav.food.description}</td>
				<td class="border px-4 py-2">{fav.food.foodCategory}</td>
				{#each RELEVANT_NUTRIENTS as r}
					<td class="border px-4 py-2">
						{getNutrientValue(fav.food.nutrients, r.name)}
					</td>
				{/each}
				<td class="border px-4 py-2">{new Date(fav.addedAt).toLocaleString()}</td>

				<!-- Actions column to delete the current food entry -->
				<td class="border px-4 py-2">
					<form action="?/removeFavorite" method="POST" use:enhance>
						<input type="hidden" name="fdcId" value={fav.food.fdcId} />
						<button class="text-red-500 hover:text-red-700 hover:underline" type="submit">
							Delete
						</button>
					</form>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
