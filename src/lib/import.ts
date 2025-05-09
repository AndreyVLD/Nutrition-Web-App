import type { SessionUser } from '$lib/types/user';

import { upsertFavorite } from '$lib/db/favorite';
import type { Food, FoodNutrient } from '$lib/types/food';
import Papa from 'papaparse';

/**
 * Imports food data from a CSV file and upserts it into the database.
 * @param file - The CSV file containing food data.
 * @param user - The user session object.
 * @returns An object containing the number of imported items.
 */
export async function importCSV(file: File, user: SessionUser) {
	const text = await file.text();
	const parsed = Papa.parse<Record<string, string>>(text, {
		header: true,
		skipEmptyLines: true
	});

	if (parsed.errors.length) {
		console.error(parsed.errors);
		throw new Error('CSV parse error');
	}

	const userId = user.id;
	let count = 0;

	// Validate and parse each row
	for (const row of parsed.data) {
		// Basic validation
		if (!row.fdcId || !row.description) continue;
		if (
			!['Foundation', 'Branded', 'SR Legacy', 'Survey (FNDDS)', 'Experimental'].includes(
				row.dataType
			)
		)
			continue;

		// Construct a Food object
		const food: Food = {
			fdcId: Number(row.fdcId),
			description: row.description,
			dataType: row.dataType as
				| 'Foundation'
				| 'Branded'
				| 'SR Legacy'
				| 'Survey (FNDDS)'
				| 'Experimental',
			foodCategory: row.foodCategory,
			brandOwner: row.brandOwner || undefined,
			foodNutrients: (() => {
				try {
					return JSON.parse(row.foodNutrients || '[]') as FoodNutrient[];
				} catch {
					return [];
				}
			})()
		};

		await upsertFavorite(food, userId);
		count++;
	}

	return { imported: count };
}

/**
 * Imports food data from a JSON file and upserts it into the database.
 * @param file - The JSON file containing food data.
 * @param user - The user session object.
 * @returns An object containing the number of imported items.
 */
export async function importJSON(file: File, user: SessionUser) {
	const text = await file.text();
	let foods: Food[];

	// Validate and parse JSON format
	try {
		foods = JSON.parse(text);
	} catch {
		throw new Error('Invalid JSON file');
	}

	// Upsert each food item
	const userId = user.id;
	for (const food of foods) {
		await upsertFavorite(food, userId);
	}

	return { imported: foods.length };
}
