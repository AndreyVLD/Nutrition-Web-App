import type { Actions } from './$types';
import { getFoodList } from '$lib/server/fdaApi';
import { fail } from '@sveltejs/kit';

function validateWord(word: string) {
	word = word.trim();
	if (word.length < 3) {
		return false;
	}

	return true;
}

function processQuery(query: string) {
	const words = query.split(' ');
	if (words.length <= 1) {
		return query;
	}

	let processedQuery = '';
	words.forEach((word) => {
		if (validateWord(word)) {
			processedQuery += ` +${word}`;
		}
	});

	return processedQuery.trim();
}

export const actions = {
	search: async (event) => {
		const formData = await event.request.formData();
		const query = (formData.get('query') ?? '').toString().trim();
		const page = (formData.get('page') ?? 1) as number;
		const processedQuery = processQuery(query);

		if (!processedQuery) {
			console.error('No query provided');
			return fail(400, { missingQuery: 'query' });
		}

		return {
			foodResponse: await getFoodList(processedQuery, page)
		};
	}
} satisfies Actions;
