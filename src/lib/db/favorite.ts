import type { Food } from '$lib/types/food';
import prisma from '$lib/db/prisma';

/**
 * Add food to the user’s favorites. If the food does not exist in the database, it will be created.
 * @param food - The food object to be added to favorites.
 * @param userId - The ID of the user who is adding the food to favorites.
 */
export async function upsertFavorite(food: Food, userId: number) {
	const nutrientsJson = JSON.parse(JSON.stringify(food.foodNutrients));

	// Ensure the food record exists/updated
	await prisma.food.upsert({
		where: { fdcId: food.fdcId },
		update: {
			description: food.description,
			dataType: food.dataType,
			foodCategory: food.foodCategory,
			brandOwner: food.brandOwner,
			nutrients: nutrientsJson
		},
		create: {
			fdcId: food.fdcId,
			description: food.description,
			dataType: food.dataType,
			foodCategory: food.foodCategory,
			brandOwner: food.brandOwner,
			nutrients: nutrientsJson
		}
	});

	// Then add it to the user’s favorites
	await prisma.favorite.upsert({
		where: {
			userId_fdcId: { userId, fdcId: food.fdcId }
		},
		update: {},
		create: {
			userId,
			fdcId: food.fdcId
		}
	});
}

/**
 * Get all favorites for a specific user.
 * @param userId - The ID of the user whose favorites are to be retrieved.
 * @returns An array of favorite items for the user.
 */
export async function getFavoritesByUser(userId: number) {
	return prisma.favorite.findMany({
		where: { userId: userId },
		select: { food: true, addedAt: true },
		orderBy: { addedAt: 'desc' }
	});
}

/**
 * Remove food from the user’s favorites.
 * @param userId - The ID of the user who is removing the food from favorites.
 * @param fdcId - The FDC ID of the food to be removed from favorites.
 */
export async function removeFavorite(userId: number, fdcId: number) {
	return prisma.favorite.delete({
		where: {
			userId_fdcId: {
				userId,
				fdcId
			}
		}
	});
}

/**
 * Get all favorites in the database.
 * @returns An array of all favorite items.
 */
export async function getAllFavorites() {
	return prisma.favorite.findMany({
		orderBy: { addedAt: 'desc' }
	});
}

/**
 * Get the count of all favorites in the database.
 * @returns The total count of favorite items.
 */
export async function getFavoriteCount() {
	return prisma.favorite.count();
}
