'use server';

import { revalidatePath } from 'next/cache';

export default async function revalidatePaths(paths: string[]) {
	for (const path of paths) {
		await revalidatePath(path);
	}
}
