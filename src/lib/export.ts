import type { Food } from '$lib/types/food';

// A list of nutrients that are relevant for export and import
export const RELEVANT_NUTRIENTS: { key: string; name: string }[] = [
	{ key: 'energy', name: 'Energy' }, // kcal
	{ key: 'protein', name: 'Protein' }, // g
	{ key: 'fat', name: 'Total lipid (fat)' }, // g
	{ key: 'carbs', name: 'Carbohydrate, by difference' }, // g
	{ key: 'fiber', name: 'Fiber, total dietary' }, // g
	{ key: 'sugar', name: 'Sugars, total including NLEA' }, // g
	{ key: 'sugar', name: 'Total Sugars' } // g
];

/**
 * Export food data to JSON format.
 * This function creates a JSON file containing the food data and triggers a download in the browser.
 * @param foods - An array of food items to be exported.
 */
export function exportJSON(foods: Food[]) {
	// Prepare the data
	const json = JSON.stringify(foods, null, 2);
	const blob = new Blob([json], { type: 'application/json' });

	// Trigger download
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'foods.json';
	a.click();
	URL.revokeObjectURL(url);
}

/**
 * Export food data to CSV format.
 * This function creates a CSV file containing the food data and triggers a download in the browser.
 * @param foods - An array of food items to be exported.
 */
export function exportCSV(foods: Food[]) {
	const cols = ['fdcId', 'description', 'dataType', 'foodCategory', 'brandOwner', 'foodNutrients'];
	const header = cols.join(',');

	// Prepare the data
	const rows = foods.map((f) => {
		const trimmed_nutrients = f.foodNutrients
			.filter((n) => RELEVANT_NUTRIENTS.some((r) => r.name === n.nutrientName))
			.map((n) => ({
				nutrientName: n.nutrientName,
				value: n.value,
				unitName: n.unitName
			}));

		// escape quotes in text fields and wrap in quotes
		const esc = (str: string) => `"${str.replace(/"/g, '""')}"`;
		return [
			f.fdcId,
			esc(f.description),
			f.dataType,
			esc(f.foodCategory),
			f.brandOwner ? esc(f.brandOwner) : '',
			// stringify the nutrients array so it ends up in one cell
			esc(JSON.stringify(trimmed_nutrients))
		].join(',');
	});

	// Join header + rows
	const csv = [header, ...rows].join('\r\n');

	// Trigger download
	const blob = new Blob([csv], { type: 'text/csv' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'foods.csv';
	a.click();
	URL.revokeObjectURL(url);
}
