import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import { loginUser } from '$lib/user';

const LoginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(1, { message: 'Password is required' })
});
export const actions = {
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const result = LoginSchema.safeParse(formData);

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

		const { errors, token } = await loginUser(email, password);

		if (errors) {
			return fail(400, {
				errors: errors
			});
		}

		cookies.set('session', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 7 // one week
		});

		redirect(303, '/');
	}
};
