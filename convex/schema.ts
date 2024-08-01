import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { authTables } from '@convex-dev/auth/server';

export default defineSchema({
    ...authTables,
    users: defineTable({
        name: v.optional(v.string()),
        image: v.optional(v.string()),
        email: v.optional(v.string()),
        emailVerificationTime: v.optional(v.number()),
        phone: v.optional(v.string()),
        phoneVerificationTime: v.optional(v.number()),
        isAnonymous: v.optional(v.boolean()),
        role: v.optional(v.string()),
    }).index('email', ['email']),

    recruiters: defineTable({
        userId: v.optional(v.id('users')),
        phone: v.number(),
        country: v.string(),
        city: v.string(),
        description: v.string(),
        rating: v.optional(v.number()),
        updatedAt: v.optional(v.number()),
    }).index('byUserId', ['userId']),

    applicants: defineTable({
        userId: v.optional(v.id('users')),
        education: v.array(
            v.object({
                institutionName: v.string(),
                startYear: v.string(),
                endYear: v.string(),
            })
        ),
        skills: v.array(
            v.object({
                text: v.string(),
                id: v.string(),
            })
        ),
        fileId: v.id('_storage'),
        rating: v.optional(v.number()),
        updatedAt: v.optional(v.number()),
    }).index('byUserId', ['userId']),

    jobs: defineTable({
        userId: v.id('users'),
        category: v.string(),
        title: v.string(),
        maxApplicants: v.number(),
        maxPositions: v.number(),
        activeApplications: v.optional(v.number()),
        acceptedApplicants: v.optional(v.number()),
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
        rating: v.optional(v.number()),
        updatedAt: v.optional(v.number()),
    })
        .index('byUserId', ['userId'])
        .index('byCategory', ['category'])
        .searchIndex('search_title', { searchField: 'title' })
        .searchIndex('search_location', { searchField: 'location' })
        .searchIndex('search_salary', { searchField: 'salary' })
        .searchIndex('search_type', { searchField: 'type' })
        .searchIndex('search_rating', { searchField: 'rating' }),

    categories: defineTable({
        name: v.string(),
        updatedAt: v.optional(v.number()),
    }).index('byName', ['name']),

    applications: defineTable({
        applicantId: v.id('users'),
        recruiterId: v.id('users'),
        jobId: v.id('jobs'),
        status: v.union(
            v.literal('applied'),
            v.literal('shortlisted'),
            v.literal('accepted'),
            v.literal('rejected'),
            v.literal('deleted'),
            v.literal('cancelled'),
            v.literal('finished')
        ),
        sop: v.string(),
        updatedAt: v.optional(v.number()),
    })
        .index('byApplicantId', ['applicantId'])
        .index('byRecruiterId', ['recruiterId'])
        .index('byJobId', ['jobId'])
        .index('by_RecruiterId_ApplicantId', ['recruiterId', 'applicantId'])
        .index('by_RecruiterId_JobId', ['recruiterId', 'jobId'])
        .index('by_ApplicantId_JobId', ['applicantId', 'jobId'])
        .index('by_ApplicantId_RecruiterId_JobId', [
            'applicantId',
            'recruiterId',
            'jobId',
        ]),

    ratings: defineTable({
        category: v.string(),
        jobId: v.id('jobs'),
        applicantId: v.id('users'),
        recruiterId: v.id('users'),
        ratings: v.optional(v.number()),
        updatedAt: v.optional(v.number()),
    })
        .index('byApplicantId', ['applicantId'])
        .index('byRecruiterId', ['recruiterId'])
        .index('byJobId', ['jobId'])
        .index('by_RecruiterId_Category', ['recruiterId', 'category'])
        .index('by_ApplicantId_Recruiter_JobId_Category', [
            'applicantId',
            'recruiterId',
            'jobId',
            'category',
        ])
        .index('by_Applicant_Category', ['applicantId', 'category'])
        .index('by_JobId_Category', ['jobId', 'category']),

    comments: defineTable({
        userId: v.id('users'),
        jobId: v.id('jobs'),
        text: v.string(),
        updatedAt: v.optional(v.number()),
    })
        .index('byUserId', ['userId'])
        .index('byJobId', ['jobId'])
        .index('by_UserId_JobId', ['userId', 'jobId']),
});
