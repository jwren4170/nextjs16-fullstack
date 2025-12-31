import { internalMutation, internalQuery } from './_generated/server';
import { components } from './_generated/api';

// Internal query to list JWKS entries
export const listJwks = internalQuery({
  args: {},
  handler: async (ctx) => {
    try {
      const jwks = await ctx.runMutation(components.betterAuth.adapter.list, {
        model: 'jwks',
      });
      return { count: jwks.length, entries: jwks };
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
      const jwks = await ctx.runMutation(components.betterAuth.adapter.list, {
        model: 'jwks',
      });

      for (const entry of jwks) {
        await ctx.runMutation(components.betterAuth.adapter.delete, {
          model: 'jwks',
          key: entry._id,
        });
      }

      return { success: true, deleted: jwks.length };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },
});

