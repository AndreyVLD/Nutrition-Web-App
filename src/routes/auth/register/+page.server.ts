import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import { createUser } from '$lib/db/user';

/**
 * Zod schema for validating registration form data.
 * This schema checks that the email is a valid email address,
 * the password is at least 8 characters long,
 * and the repeat password matches the original password.
 */
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

/**
 * Form actions for the registration page.
 */
export const actions = {
	/**
	 * Handle the registration form submission.
	 * @param request - The request object containing form data.
	 * @returns A redirect to the login page if successful, or an error message if it fails.
	 */
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const result = RegistrationSchema.safeParse(formData);

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

		// If validation succeeds, extract the email and password from the result and create the user
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
