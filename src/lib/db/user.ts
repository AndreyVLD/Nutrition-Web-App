import { JWT_SECRET } from '$env/static/private';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '$lib/db/prisma';

/**
 * Create a new user in the database.
 * @param email - The email address of the user.
 * @param password - The password for the user.
 */
export async function createUser(email: string, password: string) {
	// Check if user exists
	const user = await prisma.user.findUnique({ where: { email } });

	if (user) {
		return {
			errors: ['User already exists']
		};
	}

	try {
		// Create the user
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

/**
 * Login a user and return a JWT token.
 * @param email - The email address of the user.
 * @param password - The password for the user.
 * @return A JWT token if the login is successful, or an error message if it fails.
 */
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

	// Generate a JWT token
	const jwtUser = { id: user.id, email: user.email };

	const token = jwt.sign(jwtUser, JWT_SECRET, { expiresIn: '1d' });

	return { token };
}

/**
 * Delete a user from the database.
 * @param id - The ID of the user to delete.
 */
export async function deleteUser(id: number) {
	return prisma.user.delete({
		where: { id }
	});
}

/**
 * Gets all users from the database.
 * @returns An array of users.
 */
export async function getUsers() {
	return prisma.user.findMany({});
}

/**
 * Gets the user count from the database.
 * @returns The total count of users.
 */
export async function getUserCount() {
	return prisma.user.count();
}
