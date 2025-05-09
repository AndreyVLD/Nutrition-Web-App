export async function POST({ cookies }) {
	cookies.delete('session', { path: '/' });
	return new Response('Logout successful', { status: 200 });
}
