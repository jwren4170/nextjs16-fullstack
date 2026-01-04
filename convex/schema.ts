import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.string(),
    imageUrl: v.optional(v.id('_storage')),
    comments: v.optional(v.array(v.id('comments'))),
  }),

  comments: defineTable({
    id: v.id('posts'),
    postId: v.id('posts'),
    body: v.string(),
    authorId: v.string(),
    authorName: v.string(),
  }),
});
