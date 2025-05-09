import prisma from '$lib/db/prisma';

/**
 * Get all food items from the database.
 * @returns An array of food items.
 */
export async function getAllFoods() {
	return prisma.food.findMany({});
}

/**
 * Delete a food item from the database.
 * @param fdcId - The FDC ID of the food item to be deleted.
 */
export async function deleteFood(fdcId: number) {
	return prisma.food.delete({
		where: { fdcId }
	});
}

/**
 * Get the count of all food items in the database.
 * @returns The total count of food items.
 */
export async function getFoodCount() {
	return prisma.food.count();
}
