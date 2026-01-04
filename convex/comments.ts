import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { authComponent } from './auth';

export const getCommentsByPostId = query({
  args: {
    id: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query('comments')
      .filter((q) => q.eq(q.field('id'), args.id))
      .order('desc')
      .collect();

    return data;
  },
});

export const createComment = mutation({
  args: {
    body: v.string(),
    id: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError('Not authenticated');
    }

    return await ctx.db.insert('comments', {
      id: args.id,
      postId: args.id,
      body: args.body,
      authorId: user._id,
      authorName: user.name,
    });
  },
});
