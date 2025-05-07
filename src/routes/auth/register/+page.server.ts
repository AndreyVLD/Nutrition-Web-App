import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import bcrypt from 'bcryptjs';

const RegistrationSchema = z
	.object({
		email: z.string().email({ message: 'Invalid email address' }),
		password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
		repeatPassword: z.string()
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: 'Passwords do not match',
		path: ['confirm']
	});

export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const result = RegistrationSchema.safeParse(formData);

		if (!result.success) {
			const { fieldErrors, formErrors } = result.error.flatten();

			const fieldMsgs = Object.entries(fieldErrors).flatMap(([, errs]) =>
				(errs ?? []).map((msg) => `${msg}`)
			);
			const allErrors = [...formErrors, ...fieldMsgs];
			return fail(400, {
				errors: allErrors,
				fields: { email: formData.email }
			});
		}

		const { email, password } = result.data;

		const existing = await prisma.user.findUnique({ where: { email } });

		if (existing) {
			return fail(400, {
				errors: ['Email already exists'],
				fields: { email }
			});
		}

		const passwordHash = await bcrypt.hash(password, 10);

		await prisma.user.create({ data: { email, passwordHash } });

		redirect(303, '/auth/login');
	}
};
