import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	console.log('params', params.fdcId);
	return {};
};
