import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import { createUser } from '$lib/user';

const RegistrationSchema = z
	.object({
		email: z.string().email({ message: 'Invalid email address' }),
		password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
		repeatPassword: z.string().min(1, { message: 'Please confirm your password' })
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
				errors: allErrors
			});
		}

		const { email, password } = result.data;

		const { errors } = await createUser(email, password);

		if (errors) {
			return fail(400, {
				errors: errors
			});
		}
		redirect(303, '/auth/login');
	}
};
