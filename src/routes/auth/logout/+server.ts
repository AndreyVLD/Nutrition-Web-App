/**
 * POST request handler for logging out a user by deleting the session cookie.
 * @param cookies - The cookies object for managing cookies.
 */
export async function POST({ cookies }) {
	cookies.delete('session', { path: '/' });
	return new Response('Logout successful', { status: 200 });
}
