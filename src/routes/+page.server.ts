import type { Actions } from './$types';
import { getFood } from '$lib/server/fdaApi';
import { fail } from '@sveltejs/kit';

export const actions = {
	search: async (event) => {
		const formData = await event.request.formData();
		const query = (formData.get('query') ?? '').toString().trim();

		if (!query) {
			console.error('No query provided');
			return fail(400, { missingQuery: 'query' });
		}

		return {
			foodResponse: await getFood(query)
		};
	}
} satisfies Actions;
