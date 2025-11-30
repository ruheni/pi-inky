import { writeFile } from 'fs/promises';
import { join } from 'path';
import type { Actions } from './$types';
import { PHOTOS_DIR } from '$lib/server/utils';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const files = formData.getAll('files');

		if (files.length > 0) {
			const savedFiles = [];

			for (const file of files) {
				if (file instanceof File) {
					const arrayBuffer = await file.arrayBuffer();
					const bytes = new Uint8Array(arrayBuffer);

					const filePath = join(PHOTOS_DIR, file.name);
					await writeFile(filePath, bytes);

					savedFiles.push({
						name: file.name,
						size: file.size,
						type: file.type,
						path: filePath
					});

					console.log(`Saved: ${file.name} (${file.size} bytes)`);
				}
			}

			const fileCount = savedFiles.length;
			return {
				success: true,
				message: `Successfully uploaded ${fileCount} file${fileCount !== 1 ? 's' : ''}!`
			};
		} else {
			return {
				success: false,
				message: 'Oops, something went wrong when uploading files.'
			};
		}
	}
} satisfies Actions;
