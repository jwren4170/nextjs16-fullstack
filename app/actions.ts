'use server';

import z from 'zod';
import { postSchema } from '@/lib/validators/blog';
import { fetchMutation } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { redirect } from 'next/navigation';
import { getToken } from '@/lib/auth-server';
import { updateTag } from 'next/cache';

export async function createPost(values: z.infer<typeof postSchema>) {
  try {
    const parsed = postSchema.safeParse(values);

    if (!parsed.success) {
      throw new Error('something went wrong');
    }

    const token = await getToken();
    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token }
    );

    const uploadResult = await fetch(imageUrl, {
      method: 'POST',
      headers: {
        'Content-Type': parsed.data.imageUrl?.type,
      },
      body: parsed.data.imageUrl,
    });

    if (!uploadResult.ok) {
      return {
        error: 'Failed to upload image',
      };
    }

    const { storageId } = await uploadResult.json();
    await fetchMutation(
      api.posts.createPost,
      {
        content: parsed.data.content,
        title: parsed.data.title,
        imageUrl: storageId,
      },
      { token }
    );
  } catch {
    return {
      error: 'Failed to create post',
    };
  }

  updateTag('blog');
  return redirect('/blog');
}
