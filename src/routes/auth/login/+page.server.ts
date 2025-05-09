import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import { loginUser } from '$lib/db/user';

/**
 * Zod schema for validating login form data.
 * This schema checks that the email is a valid email address and that the password is not empty.
 */
const LoginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(1, { message: 'Password is required' })
});

/**
 * Form actions for the login page.
 */
export const actions = {
	/**
	 * Handle the login form submission.
	 * @param request - The request object containing form data.
	 * @param cookies - The cookies object for setting cookies.
	 * @returns A redirect to the home page if successful, or an error message if it fails.
	 */
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const result = LoginSchema.safeParse(formData);

		// If validation fails, flatten the errors and return them
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

		// If validation succeeds, extract the email and password from the result and log in the user
		const { email, password } = result.data;
		const { errors, token } = await loginUser(email, password);

		if (errors) {
			return fail(400, {
				errors: errors
			});
		}

		// If login is successful, set the session cookie and redirect to the home page
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
