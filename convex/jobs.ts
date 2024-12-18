import { Id } from './_generated/dataModel';
import { query, mutation } from './_generated/server';
import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';
import { getManyFrom } from 'convex-helpers/server/relationships';
import { asyncMap } from 'convex-helpers';
import { auth } from './auth';
import { getAuthUserId } from '@convex-dev/auth/server';
import { hasPermission } from './lib/permissions';

const ApplicationStatuses = {
    APPLIED: 'applied' as const,
    ACCEPTED: 'accepted' as const,
    REJECTED: 'rejected' as const,
    SHORTLISTED: 'shortlisted' as const,
    DELETED: 'deleted' as const,
    CANCELLED: 'cancelled' as const,
    FINISHED: 'finished' as const,
};

export const getAllJobs = query({
    args: { paginationOpts: paginationOptsValidator },
    handler: async (ctx, args) => {
        return await ctx.db
            .query('jobs')
            .order('desc')
            .paginate(args.paginationOpts);
    },
});

export const getJobBySearch = query({
    args: {
        search: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        if (args.search === '') {
            return await ctx.db.query('jobs').order('desc').collect();
        }

        const titleSearch = await ctx.db
            .query('jobs')
            .withSearchIndex('search_title', (q) =>
                q.search('title', args?.search!)
            )
            .take(10);

        if (titleSearch.length > 0) {
            return titleSearch;
        }
        const locationSearch = await ctx.db
            .query('jobs')
            .withSearchIndex('search_location', (q) =>
                q.search('location', args?.search!)
            )
            .take(10);

        if (locationSearch.length > 0) {
            return locationSearch;
        }
        const salarySearch = await ctx.db
            .query('jobs')
            .withSearchIndex('search_salary', (q) =>
                q.search('salary', args?.search!)
            )
            .take(10);

        if (salarySearch.length > 0) {
            return salarySearch;
        }
    },
});

export const getJobById = query({
    args: { jobId: v.id('jobs') },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.jobId);
    },
});

export const getAllRecruiterJobs = query({
    args: { userId: v.id('users') },
    handler: async (ctx, args) => {
        const jobs = await ctx.db
            .query('jobs')
            .withIndex('byUserId', (q) => q.eq('userId', args.userId))
            .order('desc')
            .collect();

        return jobs;
    },
});

export const getJobsByCategory = query({
    args: { categoryId: v.id('categories') },
    handler: async (ctx, args) => {
        const category = await ctx.db.get(args.categoryId);

        if (!category) return null;

        const jobs = await ctx.db
            .query('jobs')
            .withIndex('byCategory', (q) => q.eq('category', category.name))
            .order('desc')
            .collect();

        return { jobs, category };
    },
});

export const getAllRecruiterJobsWithoutId = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const user = await ctx.db.get(userId);

        if (!user || !hasPermission(user, 'jobs', 'view')) {
            return;
        }

        const jobs = await ctx.db
            .query('jobs')
            .withIndex('byUserId', (q) => q.eq('userId', user._id))
            .order('desc')
            .collect();

        return jobs;
    },
});

export const createJob = mutation({
    args: {
        title: v.string(),
        category: v.string(),
        maxApplicants: v.number(),
        maxPositions: v.number(),
        skillsets: v.array(
            v.object({
                text: v.string(),
                id: v.string(),
            })
        ),
        description: v.string(),
        location: v.string(),
        type: v.string(),
        salary: v.number(),
        companyLogo: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const user = await ctx.db.get(userId);

        if (!user || !hasPermission(user, 'jobs', 'create')) {
            return {
                success: false,
                message: 'You have no permissions to add jobs',
            };
        }

        const newJobId = await ctx.db.insert('jobs', {
            userId: user._id,
            category: args.category,
            title: args.title,
            maxApplicants: args.maxApplicants,
            maxPositions: args.maxPositions,
            activeApplications: 0,
            acceptedApplicants: 0,
            skillsets: args.skillsets,
            description: args.description,
            location: args.location,
            type: args.type,
            salary: args.salary,
            rating: 0,
        });

        if (!newJobId) {
            return {
                success: false,
                message: 'Job creation failed',
            };
        }

        return {
            success: true,
            message: 'Job created successfully',
        };
    },
});

export const updateJob = mutation({
    args: {
        jobId: v.id('jobs'),
        title: v.string(),
        category: v.string(),
        maxApplicants: v.number(),
        maxPositions: v.number(),
        skillsets: v.array(
            v.object({
                text: v.string(),
                id: v.string(),
            })
        ),
        description: v.string(),
        location: v.string(),
        type: v.string(),
        salary: v.number(),
        companyLogo: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const user = await ctx.db.get(userId);
        const job = await ctx.db.get(args.jobId);

        if (!user || !hasPermission(user, 'jobs', 'update')) {
            return {
                success: false,
                message: 'You have no permissions to update jobs',
            };
        }

        if (!job) {
            return {
                success: false,
                message: 'No job found',
            };
        }

        await ctx.db.patch(job?._id!, {
            userId: user._id,
            title: args.title,
            maxApplicants: args.maxApplicants,
            maxPositions: args.maxPositions,
            skillsets: args.skillsets,
            description: args.description,
            location: args.location,
            type: args.type,
            salary: args.salary,
            updatedAt: Date.now(),
        });

        return {
            success: true,
            message: `Job ${job.title} updated successfully.`,
        };
    },
});

export const deleteJob = mutation({
    args: { jobId: v.id('jobs') },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const user = await ctx.db.get(userId);

        if (!user || !hasPermission(user, 'jobs', 'delete')) {
            return {
                success: false,
                message: 'You have no permissions to delete jobs',
            };
        }

        const myApplications = await getManyFrom(
            ctx.db,
            'applications',
            'byJobId',
            args.jobId,
            'jobId'
        );

        const job = await ctx.db.get(args.jobId);

        if (!job) {
            return {
                success: false,
                message: 'No job found',
            };
        }

        const isDeletable = myApplications.some(
            (myApplication) =>
                myApplication.status === ApplicationStatuses.FINISHED ||
                myApplication.status === ApplicationStatuses.REJECTED ||
                myApplication.status === ApplicationStatuses.CANCELLED ||
                myApplication.status === ApplicationStatuses.DELETED
        );

        if (isDeletable) {
            return {
                success: false,
                message: 'You still have some active applications!',
            };
        }

        await ctx.db.delete(args.jobId);

        // delete all applicant applications
        await asyncMap(myApplications, async (myApplication) => {
            return await ctx.db.delete(myApplication._id);
        });

        return {
            success: true,
            message: `Job '${job?.title}' deleted successfully`,
        };
    },
});
