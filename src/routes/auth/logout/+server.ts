import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
	cookies.delete('session', { path: '/' });
	return json({ status: 200 });
}
