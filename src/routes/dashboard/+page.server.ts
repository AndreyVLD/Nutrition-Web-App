import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import prisma from '$lib/db/prisma';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) {
		throw error(401, 'Unauthorized');
	}

	if (user.isAdmin) {
		redirect(300, '/admin');
	}
	const favorites = await prisma.favorite.findMany({
		where: { userId: user.id },
		select: { food: true, addedAt: true },
		orderBy: { addedAt: 'desc' }
	});
	return { user, favorites };
};
