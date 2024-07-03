import { defineSchema, defineTable } from 'convex/server';
import { Validator, v } from 'convex/values';

export const userSchema = {
    email: v.string(),
    name: v.optional(v.string()),
    emailVerified: v.optional(v.number()),
    image: v.optional(v.string()),
    role: v.optional(v.string()),
};

export const sessionSchema = {
    userId: v.id('users'),
    expires: v.number(),
    sessionToken: v.string(),
};

export const accountSchema = {
    userId: v.id('users'),
    type: v.union(
        v.literal('email'),
        v.literal('oidc'),
        v.literal('oauth'),
        v.literal('webauthn')
    ),
    provider: v.string(),
    providerAccountId: v.string(),
    refresh_token: v.optional(v.string()),
    access_token: v.optional(v.string()),
    expires_at: v.optional(v.number()),
    token_type: v.optional(v.string() as Validator<Lowercase<string>>),
    scope: v.optional(v.string()),
    id_token: v.optional(v.string()),
    session_state: v.optional(v.string()),
};

export const verificationTokenSchema = {
    identifier: v.string(),
    token: v.string(),
    expires: v.number(),
};

export const authenticatorSchema = {
    credentialID: v.string(),
    userId: v.id('users'),
    providerAccountId: v.string(),
    credentialPublicKey: v.string(),
    counter: v.number(),
    credentialDeviceType: v.string(),
    credentialBackedUp: v.boolean(),
    transports: v.optional(v.union(v.string(), v.null())),
};

const authTables = {
    users: defineTable(userSchema).index('email', ['email']),
    sessions: defineTable(sessionSchema)
        .index('sessionToken', ['sessionToken'])
        .index('userId', ['userId']),
    accounts: defineTable(accountSchema)
        .index('providerAndAccountId', ['provider', 'providerAccountId'])
        .index('userId', ['userId']),
    verificationTokens: defineTable(verificationTokenSchema).index(
        'identifierToken',
        ['identifier', 'token']
    ),
    authenticators: defineTable(authenticatorSchema)
        .index('userId', ['userId'])
        .index('credentialID', ['credentialID']),
};

export default defineSchema({
    ...authTables,
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
