import { internalMutation, internalQuery } from './_generated/server';
import { components } from './_generated/api';

// Internal query to list JWKS entries
export const listJwks = internalQuery({
  args: {},
  handler: async (ctx) => {
    try {
      const jwks = await ctx.runQuery(components.betterAuth.adapter.findMany, {
        model: 'jwks',
        paginationOpts: {
          cursor: null,
          numItems: 100,
        },
      });
      return { count: jwks.page.length, entries: jwks.page };
    } catch (error) {
      return { error: String(error), count: 0, entries: [] };
    }
  },
});

// Internal mutation to clear all JWKS entries
export const clearAllJwks = internalMutation({
  args: {},
  handler: async (ctx) => {
    try {
      const jwks = await ctx.runQuery(components.betterAuth.adapter.findMany, {
        model: 'jwks',
        paginationOpts: {
          cursor: null,
          numItems: 100,
        },
      });

      await ctx.runMutation(components.betterAuth.adapter.deleteMany, {
        input: {
          model: 'jwks',
          where: [],
        },
        paginationOpts: {
          cursor: null,
          numItems: 100,
        },
      });

      return { success: true, deleted: jwks.page.length };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },
});
