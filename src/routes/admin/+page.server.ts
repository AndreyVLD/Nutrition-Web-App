import type { PageServerLoad } from './$types';
import { deleteUser, getUserCount, getUsers } from '$lib/db/user';
import { deleteFood, getAllFoods, getFoodCount } from '$lib/db/food';
import { getFavoriteCount } from '$lib/db/favorite';
import { error } from '@sveltejs/kit';

/**
 * Load function for the admin page.
 * @param event - The event object containing request and response information.
 * @returns An object containing user information, food items, and counts.
 */
export const load: PageServerLoad = async (event) => {
	// Check if the user is authenticated and is an admin
	const user = event.locals.user;
	if (!user) {
		throw error(401, 'Unauthorized');
	}
	if (!user.isAdmin) {
		throw error(403, 'Unauthorized');
	}

	// Fetch all users, food items, and counts
	const allUsers = await getUsers();
	const foods = await getAllFoods();
	const userCount = await getUserCount();
	const foodCount = await getFoodCount();
	const favoriteCount = await getFavoriteCount();

	return { user, allUsers, foods, userCount, foodCount, favoriteCount };
};

/**
 * Form Actions for the admin page.
 * @param request - The request object containing form data.
 * @returns An object indicating success or failure of the action.
 */
export const actions = {
	/**
	 * Delete a food item from the database.
	 * @param request - The request object containing form data.
	 */
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

	/**
	 * Delete a user from the database.
	 * @param request - The request object containing form data.
	 */
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
