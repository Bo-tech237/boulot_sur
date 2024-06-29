import { Id } from './_generated/dataModel';
import { query, mutation } from './_generated/server';
import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';
import {
    getAll,
    getOneFrom,
    getManyFrom,
    getManyVia,
} from 'convex-helpers/server/relationships';
import { asyncMap } from 'convex-helpers';

export const getAllCategories = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('categories').order('desc').collect();
    },
});
