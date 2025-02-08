import { FDC_API_KEY } from '$env/static/private';

const BASE_FDA_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';

export function getFood(name: string, page: number = 1) {
	const url = new URL(BASE_FDA_URL);
	url.searchParams.append('api_key', FDC_API_KEY);
	url.searchParams.append('query', name);
	url.searchParams.append('dataType', 'Foundation');
	url.searchParams.append('pageSize', '50');
	url.searchParams.append('pageNumber', page.toString());
	url.searchParams.append('sortBy', 'dataType.keyword');
	url.searchParams.append('sortOrder', 'desc');

	const request = new Request(url.toString(), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	console.log(url.toString());

	fetch(request)
		.then(async (response) => {
			const data = await response.json();
			// console.log(data.foods[0].foodNutrients);
		})
		.catch((error) => {
			console.error(error);
		});
}
