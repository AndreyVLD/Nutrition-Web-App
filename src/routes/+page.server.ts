import type { Actions } from './$types';
import { getFoodList } from '$lib/api/fdaApi';
import { fail } from '@sveltejs/kit';

/**
 * Validates the input word.
 * @param word - The word to validate.
 * @returns True if the word is valid, false otherwise.
 */
function validateWord(word: string) {
	word = word.trim();
	if (word.length < 3) {
		return false;
	}

	return true;
}

/**
 * Processes the input food query string by splitting it into words and validating each word.
 * @param query - The query string to process.
 * @returns The processed query string.
 */
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

/**
 * Form actions for the food search page.
 */
export const actions = {
	/**
	 * Handles the food search form submission.
	 * @param event - The event object containing request and response information.
	 * @returns An object containing the food response as a list of foods return from the FDA or an error message.
	 */
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
