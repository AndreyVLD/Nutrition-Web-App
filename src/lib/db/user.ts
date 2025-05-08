import { JWT_SECRET } from '$env/static/private';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '$lib/db/prisma';

export async function createUser(email: string, password: string) {
	// Check if user exists
	const user = await prisma.user.findUnique({ where: { email } });

	if (user) {
		return {
			errors: ['User already exists']
		};
	}

	try {
		const user = await prisma.user.create({
			data: {
				email,
				passwordHash: await bcrypt.hash(password, 10)
			}
		});

		return { user };
	} catch {
		return {
			errors: ['Something went wrong']
		};
	}
}

export async function loginUser(email: string, password: string) {
	// Check if user exists
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		return {
			errors: ['Invalid credentials']
		};
	}

	// Verify the password
	const passwordIsValid = await bcrypt.compare(password, user.passwordHash);

	if (!passwordIsValid) {
		return {
			errors: ['Invalid credentials']
		};
	}

	const jwtUser = { id: user.id, email: user.email };

	const token = jwt.sign(jwtUser, JWT_SECRET, { expiresIn: '1d' });

	return { token };
}
