import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import { join } from 'path';
import type { RequestHandler } from './$types';
import { PHOTOS_DIR } from '$lib/server/utils';

export const GET: RequestHandler = async ({ params }) => {
	let { filename } = params;

	if (!filename) {
		return new Response('Not found', { status: 404 });
	}

	filename = decodeURIComponent(filename);
	if (filename.includes('..') || filename.includes('/')) {
		return new Response('Forbidden', { status: 403 });
	}

	const filePath = join(PHOTOS_DIR, filename);

	try {
		const fileStat = await stat(filePath);
		const stream = createReadStream(filePath);

		const ext = filename.split('.').pop()?.toLowerCase();
		const contentTypes: Record<string, string> = {
			jpg: 'image/jpeg',
			jpeg: 'image/jpeg',
			png: 'image/png',
			heic: 'image/heic'
		};

		const contentType = ext ? contentTypes[ext] || 'application/octet-stream' : 'application/octet-stream';

		// Convert Node.js stream to Web Streams API
		return new Response(stream as any, {
			headers: {
				'content-type': contentType,
				'content-length': String(fileStat.size),
				'cache-control': 'public, max-age=31536000, immutable'
			}
		});
	} catch (error: any) {
		if (error.code === 'ENOENT') {
			return new Response('Not found', { status: 404 });
		}
		console.error('Error serving file:', error);
		return new Response('Internal server error', { status: 500 });
	}
};
