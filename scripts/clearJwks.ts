/**
 * Script to clear JWKS entries from the Convex database
 * Run with: npx convex run scripts/clearJwks:clearJwks
 */

import { internalMutation } from '../convex/_generated/server';
import { components } from '../convex/_generated/api';

export const clearJwks = internalMutation({
  args: {},
  handler: async (ctx) => {
    console.log('Clearing JWKS entries...');
    
    try {
      // List all JWKS entries
      const jwks = await ctx.runMutation(components.betterAuth.adapter.list, {
        model: 'jwks',
      });
      
      console.log(`Found ${jwks.length} JWKS entries`);
      
      // Delete each entry
      for (const entry of jwks) {
        await ctx.runMutation(components.betterAuth.adapter.delete, {
          model: 'jwks',
          key: entry._id,
        });
        console.log(`Deleted JWKS entry: ${entry._id}`);
      }
      
      console.log(`Successfully deleted ${jwks.length} JWKS entries`);
      return { success: true, deleted: jwks.length };
    } catch (error) {
      console.error('Error clearing JWKS:', error);
      return { success: false, error: String(error) };
    }
  },
});

