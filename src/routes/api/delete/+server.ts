import { unlink, stat } from 'fs/promises';
import { join } from 'path';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PHOTOS_DIR } from '$lib/server/utils';

export const DELETE: RequestHandler = async ({ request }) => {
	const { filename } = await request.json();

	try {
		const filePath = join(PHOTOS_DIR, filename);

		await stat(filePath);

		await unlink(filePath);

		return json({
			message: 'Photo deleted successfully.',
			success: true
		});
	} catch (error: any) {
		console.error('Error occurred:', error);

		if (error.code === 'ENOENT') {
			console.error('File not found:', filename);
			return json(
				{
					message: 'File not found.',
					success: false
				},
				{ status: 404 }
			);
		}

		return json(
			{
				message: 'An error occurred while deleting the photo.',
				success: false,
				error: error instanceof Error ? error.message : String(error)
			},
			{ status: 500 }
		);
	}
};
