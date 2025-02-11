import type { Actions } from './$types';
import { getFood } from '$lib/server/fdaApi';
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
		const processedQuery = processQuery(query);

		console.log('Query:', processedQuery);

		if (!processedQuery) {
			console.error('No query provided');
			return fail(400, { missingQuery: 'query' });
		}

		return {
			foodResponse: await getFood(processedQuery)
		};
	}
} satisfies Actions;
