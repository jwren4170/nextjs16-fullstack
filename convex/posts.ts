import { mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import { authComponent } from './auth';

// Create a new post with the given fields
export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError('Not authenticated');
    }

    const newPost = await ctx.db.insert('posts', {
      title: args.title,
      content: args.content,
      authorId: user._id,
      imageUrl: args.imageUrl,
      comments: [],
    });
    return newPost;
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query('posts').order('desc').collect();

    if (!posts) {
      throw new ConvexError('Post not found');
    }

    return Promise.all(
      posts.map(async (post) => ({
        ...post,
        imageUrl: post.imageUrl
          ? await ctx.storage.getUrl(post.imageUrl)
          : null,
      }))
    );
  },
});

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError('Not authenticated');
    }

    return await ctx.storage.generateUploadUrl();
  },
});

export const getPostById = query({
  args: {
    id: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (!post) {
      throw new ConvexError('Post not found');
    }

    const resolvedImageUrl =
      post?.imageUrl !== undefined
        ? await ctx.storage.getUrl(post.imageUrl)
        : null;

    return {
      ...post,
      imageUrl: resolvedImageUrl,
    };
  },
});
