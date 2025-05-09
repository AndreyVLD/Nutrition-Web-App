import type { PageServerLoad } from './$types';
import { deleteUser, getUserCount, getUsers } from '$lib/db/user';
import { deleteFood, getAllFoods, getFoodCount } from '$lib/db/food';
import { getFavoriteCount } from '$lib/db/favorite';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) {
		throw error(401, 'Unauthorized');
	}
	if (!user.isAdmin) {
		throw error(403, 'Unauthorized');
	}

	const allUsers = await getUsers();
	const foods = await getAllFoods();
	const userCount = await getUserCount();
	const foodCount = await getFoodCount();
	const favoriteCount = await getFavoriteCount();

	return { user, allUsers, foods, userCount, foodCount, favoriteCount };
};

export const actions = {
	deleteFood: async ({ request }) => {
		const formData = await request.formData();
		const fdcId = formData.get('fdcId');

		if (!fdcId) {
			throw error(400, 'Bad Request');
		}

		try {
			await deleteFood(Number(fdcId.valueOf()));
			return { success: true };
		} catch (err) {
			console.error(err);
			throw error(500, 'Internal Server Error');
		}
	},
	deleteUser: async ({ request }) => {
		const formData = await request.formData();
		const userId = formData.get('userId');

		if (!userId) {
			throw error(400, 'Bad Request');
		}

		try {
			await deleteUser(Number(userId.valueOf()));
			return { success: true };
		} catch (err) {
			console.error(err);
			throw new Response('Internal Server Error', { status: 500 });
		}
	}
};
