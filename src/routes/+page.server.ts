import type { Actions } from './$types';

export const actions = {
	search: async (event) => {
		const formData = await event.request.formData();
		const query = formData.get('query');
		console.log(query);

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
