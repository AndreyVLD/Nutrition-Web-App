import { FDC_API_KEY } from '$env/static/private';
import type { Food, FoodSearchResponse } from '$lib/types/food';

const BASE_FDA_URL = 'https://api.nal.usda.gov/fdc/v1/foods';

export async function getFoodList(name: string, page: number = 1) {
	const url = new URL(`${BASE_FDA_URL}/search`);
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

export async function getFood(fdcId: number) {
	const url = new URL(`${BASE_FDA_URL}/${fdcId}`);
	url.searchParams.append('api_key', FDC_API_KEY);

	const request = new Request(url.toString(), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const response = await fetch(request);
	const food: Food = await response.json();

	return food;
}
