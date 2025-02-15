import { FDC_API_KEY } from '$env/static/private';
import type { FoodSearchResponse } from '$lib/types/food';

const BASE_FDA_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';

export async function getFood(name: string, page: number = 1) {
	const url = new URL(BASE_FDA_URL);
	url.searchParams.append('api_key', FDC_API_KEY);
	url.searchParams.append('query', name);
	url.searchParams.append('dataType', 'Foundation,Branded');
	url.searchParams.append('pageSize', '54');
	url.searchParams.append('pageNumber', page.toString());
	url.searchParams.append('sortBy', 'dataType.keyword');
	url.searchParams.append('sortOrder', 'desc');

	const request = new Request(url.toString(), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const response = await fetch(request);
	const foodData: FoodSearchResponse = await response.json();

	return foodData;
}
