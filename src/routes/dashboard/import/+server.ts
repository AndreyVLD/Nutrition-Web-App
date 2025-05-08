import { importCSV, importJSON } from '$lib/import';

export async function POST({ request, locals }) {
	const user = locals.user;
	if (!user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const data = await request.formData();
	const file = data.get('file') as File;
	const format = data.get('format');

	if (!file || !format) {
		return new Response('Missing file or format', { status: 400 });
	}

	if (format !== 'json' && format !== 'csv') {
		return new Response('Invalid format', { status: 400 });
	}

	if (format === 'json') {
		await importJSON(file, user);
	} else {
		await importCSV(file, user);
	}

	return new Response('Import successful', { status: 200 });
}
