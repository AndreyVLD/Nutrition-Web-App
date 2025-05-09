import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { getFavoritesByUser, removeFavorite } from '$lib/db/favorite';

/**
 * Load function for the dashboard page.
 * @param event - The event object containing request and response information.
 * @returns An object containing user information and their favorite food items.
 */
export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) {
		throw error(401, 'Unauthorized');
	}

	if (user.isAdmin) {
		redirect(300, '/admin');
	}

	const favorites = await getFavoritesByUser(user.id);

	return { user, favorites };
};

/**
 * Form Actions for the dashboard page.
 */
export const actions = {
	/**
	 * Remove a food item from the user's favorites.
	 * @param request - The request object containing form data.
	 * @param locals - The locals object containing user session information.
	 * @returns An object indicating success or failure of the action.
	 */
	removeFavorite: async ({ request, locals }) => {
		const user = locals.user;
		if (!user) {
			throw error(401, 'Unauthorized');
		}

		const formData = await request.formData();
		const fdcId = formData.get('fdcId');

		if (!fdcId) {
			throw error(400, 'Bad Request');
		}

		try {
			await removeFavorite(user.id, Number(fdcId.valueOf()));
			return { success: true };
		} catch (err) {
			console.error(err);
			throw error(500, 'Internal Server Error');
		}
	}
};
