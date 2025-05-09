import type { LayoutServerLoad } from './$types';

/**
 * Load function for the layout.
 * @param locals - The locals object containing user session information.
 * @returns An object containing user information.
 */
export const load: LayoutServerLoad = async ({ locals }) => {
	const user = locals.user;
	return { user };
};
