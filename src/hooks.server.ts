import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import prisma from '$lib/db/prisma';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = undefined;

	const token = event.cookies.get('session');

	if (token) {
		try {
			const payload = jwt.verify(token, JWT_SECRET);

			if (typeof payload === 'string') {
				throw new Error('Something went wrong');
			}

			const jwtUser = payload as { id: number; email: string };
			const userId = jwtUser.id;

			const user = await prisma.user.findUnique({
				where: { id: userId },
				select: { id: true, email: true, isAdmin: true }
			});

			if (user) {
				event.locals.user = {
					id: user.id,
					email: user.email,
					isAdmin: user.isAdmin
				};
			}
		} catch (err) {
			console.error('Session verification failed:', err);
			event.cookies.delete('session', { path: '/' });
		}
	}

	return resolve(event);
};
