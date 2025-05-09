import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

/**
 * Seed the database with an admin user.
 */
async function main() {
	const hash = await bcrypt.hash('AdminPass123', 10);
	await db.user.upsert({
		where: { email: 'admin@example.com' },
		update: {},
		create: {
			email: 'admin@example.com',
			passwordHash: hash,
			isAdmin: true
		}
	});
}

main()
	.catch(console.error)
	.finally(() => db.$disconnect());
