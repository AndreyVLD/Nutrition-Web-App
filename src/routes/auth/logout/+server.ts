export async function POST({ cookies }) {
	cookies.delete('session', { path: '/' });
	return new Response();
}
