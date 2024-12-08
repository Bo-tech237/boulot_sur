import { Id } from './_generated/dataModel';
import { query, mutation } from './_generated/server';
import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';
import { getManyFrom } from 'convex-helpers/server/relationships';
import { asyncMap } from 'convex-helpers';
import { authTables } from '@convex-dev/auth/server';

export const getAllCategories = query({
    args: {},
    handler: async (ctx) => {
        const categories = await ctx.db
            .query('categories')
            .order('asc')
            .collect();

        return categories;
    },
});

export const getCategoriesWithTotalJobs = query({
    args: {},
    handler: async (ctx) => {
        const categories = await ctx.db
            .query('categories')
            .order('asc')
            .collect();

        const categoryWithTotalJobs = await asyncMap(
            categories,
            async (category) => {
                const jobsResult = await getManyFrom(
                    ctx.db,
                    'jobs',
                    'byCategory',
                    category.name,
                    'category'
                );

                return { category, totalJobs: jobsResult.length };
            }
        );

        if (!categoryWithTotalJobs) return;

        return categoryWithTotalJobs;
    },
});

export const getHomeCategories = query({
    args: {},
    handler: async (ctx) => {
        const categories = await ctx.db
            .query('categories')
            .order('asc')
            .take(6);

        const categoryWithTotalJobs = await asyncMap(
            categories,
            async (category) => {
                const jobsResult = await getManyFrom(
                    ctx.db,
                    'jobs',
                    'byCategory',
                    category.name,
                    'category'
                );

                return { category, totalJobs: jobsResult.length };
            }
        );

        if (!categoryWithTotalJobs) return;

        return categoryWithTotalJobs;
    },
});
