import type { Food } from '$lib/types/food';
import prisma from '$lib/db/prisma';

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

export async function getFavoritesByUser(userId: number) {
	return prisma.favorite.findMany({
		where: { userId: userId },
		select: { food: true, addedAt: true },
		orderBy: { addedAt: 'desc' }
	});
}

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

export async function getAllFavorites() {
	return prisma.favorite.findMany({
		orderBy: { addedAt: 'desc' }
	});
}

export async function getFavoriteCount() {
	return prisma.favorite.count();
}
