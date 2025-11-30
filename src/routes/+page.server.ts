import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import type { PageServerLoad } from './$types';
import { PHOTOS_DIR } from '$lib/server/utils';

export const load: PageServerLoad = async () => {
	const photos = [];

	try {
		const entries = await readdir(PHOTOS_DIR, { withFileTypes: true });

		for (const entry of entries) {
			if (entry.isFile()) {
				const ext = entry.name.split('.').pop()?.toLowerCase();
				if (['jpg', 'jpeg', 'png', 'heic'].includes(ext || '')) {
					const filePath = join(PHOTOS_DIR, entry.name);
					const fileStat = await stat(filePath);

					photos.push({
						name: entry.name,
						size: fileStat.size,
						modified: fileStat.mtime,
						url: `/p/${encodeURIComponent(entry.name)}`
					});
				}
			}
		}

		// Sort by modified date, newest first
		photos.sort((a, b) => {
			const timeA = a.modified ? new Date(a.modified).getTime() : 0;
			const timeB = b.modified ? new Date(b.modified).getTime() : 0;
			return timeB - timeA;
		});
	} catch (error) {
		console.error('Error reading photos directory:', error);
		return undefined;
	}

	return {
		photos
	};
};
