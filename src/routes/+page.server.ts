import type { Actions } from './$types';
import { getFood } from '$lib/services/fdaApi';
import { fail } from '@sveltejs/kit';

export const actions = {
	search: async (event) => {
		const formData = await event.request.formData();
		const query = (formData.get('query') ?? '').toString().trim();

		if (!query) {
			console.error('No query provided');
			return fail(400, { missingQquery: 'query' });
		}
		getFood(query);
		return {
			people: [
				{ id: 1, name: 'John Doe' },
				{ id: 2, name: 'Jane Doe' },
				{ id: 3, name: 'Alice' },
				{ id: 4, name: 'Bob' }
			]
		};
	}
} satisfies Actions;
