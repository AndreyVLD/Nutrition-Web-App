import prisma from '$lib/db/prisma';

export async function getAllFoods() {
	return prisma.food.findMany({});
}

export async function deleteFood(fdcId: number) {
	return prisma.food.delete({
		where: { fdcId }
	});
}

export async function getFoodCount() {
	return prisma.food.count();
}
