import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.string(),
    imageUrl: v.optional(v.id('_storage')),
  }),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
  }),
});
