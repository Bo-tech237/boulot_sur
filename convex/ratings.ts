import { Id } from './_generated/dataModel';
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { hasPermission } from './lib/permissions';
import { getAuthUserId } from '@convex-dev/auth/server';

export const getAllRatings = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('ratings').order('desc').collect();
    },
});

export const getRatingByUser = query({
    args: {
        userId: v.id('users'),
        applicantId: v.id('users'),
        recruiterId: v.id('users'),
        jobId: v.id('jobs'),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);

        if (user === null) return;

        if (hasPermission(user, 'ratings', 'view') === true) {
            const rating = await ctx.db
                .query('ratings')
                .withIndex('by_ApplicantId_Recruiter_JobId_Category', (q) =>
                    q
                        .eq('applicantId', args?.applicantId)
                        .eq('recruiterId', args.recruiterId)
                        .eq('jobId', args.jobId)
                        .eq('category', 'applicant')
                )
                .first();

            return rating;
        } else {
            const rating = await ctx.db
                .query('ratings')
                .withIndex('by_ApplicantId_Recruiter_JobId_Category', (q) =>
                    q
                        .eq('applicantId', args?.applicantId)
                        .eq('recruiterId', args.recruiterId)
                        .eq('jobId', args.jobId)
                        .eq('category', 'job')
                )
                .first();

            return rating;
        }
    },
});

export const createRating = mutation({
    args: {
        rating: v.number(),
        applicantId: v.optional(v.string()),
        recruiterId: v.optional(v.string()),
        jobId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const user = await ctx.db.get(userId);
        if (!user || !hasPermission(user, 'ratings', 'create')) {
            return {
                success: false,
                message: 'Insufficient ratings permissions',
            };
        }

        if (user?.roles?.includes('recruiter')) {
            const rating = await ctx.db
                .query('ratings')
                .withIndex('by_ApplicantId_Recruiter_JobId_Category', (q) =>
                    q
                        .eq('applicantId', args?.applicantId! as Id<'users'>)
                        .eq('recruiterId', user._id)
                        .eq('jobId', args.jobId as Id<'jobs'>)
                        .eq('category', 'applicant')
                )
                .first();

            if (rating) {
                return {
                    success: false,
                    message: `You have already rated this applicant with ${rating?.ratings} stars`,
                };
            }

            const acceptedApplicant = await ctx.db
                .query('applications')
                .withIndex('by_RecruiterId_ApplicantId_JobId_Status', (q) =>
                    q
                        .eq('recruiterId', user._id)
                        .eq('applicantId', args?.applicantId! as Id<'users'>)
                        .eq('jobId', args.jobId as Id<'jobs'>)
                        .eq('status', 'finished')
                )
                .first();

            if (!acceptedApplicant) {
                return {
                    success: false,
                    message:
                        'Applicant did not worked under you.Hence you cannot give a rating.',
                };
            }

            const newRating = await ctx.db.insert('ratings', {
                category: 'applicant',
                applicantId: args.applicantId! as Id<'users'>,
                recruiterId: user._id as Id<'users'>,
                jobId: args.jobId as Id<'jobs'>,
                ratings: args.rating,
            });

            if (!newRating) {
                return {
                    success: false,
                    message: 'Error during rating',
                };
            }

            // get the average of ratings
            const applicantRatings = await ctx.db
                .query('ratings')
                .withIndex('by_Applicant_Category', (q) =>
                    q
                        .eq('applicantId', args.applicantId! as Id<'users'>)
                        .eq('category', 'applicant')
                )
                .filter((q) => q.gt(q.field('ratings'), 0))
                .collect();

            if (applicantRatings.length === 0) {
                return {
                    success: false,
                    message: 'No average ratings',
                };
            }

            const avg =
                parseFloat(
                    applicantRatings
                        .reduce((sum, rating) => sum + rating.ratings!, 0)
                        .toFixed(2)
                ) / applicantRatings.length;

            console.log('avg rating from applicant:', avg);
            if (!avg) {
                return {
                    success: false,
                    message: 'Error while calculating average ratings',
                };
            }

            // update the applicant's rating
            const applicant = await ctx.db
                .query('applicants')
                .withIndex('byUserId', (q) =>
                    q.eq('userId', args.applicantId as Id<'users'>)
                )
                .first();

            if (!applicant) {
                return {
                    success: false,
                    message: 'Error while updating applicants average rating',
                };
            }

            await ctx.db.patch(applicant?._id!, {
                rating: avg,
                updatedAt: Date.now(),
            });

            return {
                success: true,
                message: 'Rating added successfully',
            };
        }

        if (user?.roles?.includes('applicant')) {
            const rating = await ctx.db
                .query('ratings')
                .withIndex('by_ApplicantId_Recruiter_JobId_Category', (q) =>
                    q
                        .eq('applicantId', args?.applicantId! as Id<'users'>)
                        .eq('recruiterId', user._id)
                        .eq('jobId', args.jobId as Id<'jobs'>)
                        .eq('category', 'job')
                )
                .first();

            if (rating) {
                return {
                    success: false,
                    message: `You have already rated this job with ${rating?.ratings} stars`,
                };
            }

            const acceptedApplicant = await ctx.db
                .query('applications')
                .withIndex('by_RecruiterId_ApplicantId_JobId_Status', (q) =>
                    q
                        .eq('recruiterId', user._id)
                        .eq('applicantId', args?.applicantId! as Id<'users'>)
                        .eq('jobId', args.jobId as Id<'jobs'>)
                        .eq('status', 'finished')
                )
                .first();

            if (!acceptedApplicant) {
                return {
                    success: false,
                    message:
                        'You did not work for this job.Hence you can not give a rating.',
                };
            }

            const newRating = await ctx.db.insert('ratings', {
                category: 'job',
                applicantId: args.applicantId! as Id<'users'>,
                recruiterId: user._id as Id<'users'>,
                jobId: args.jobId as Id<'jobs'>,
                ratings: args.rating,
            });

            if (!newRating) {
                return {
                    success: false,
                    message: 'Error during rating',
                };
            }

            // get the average ratings of a job
            const jobRatings = await ctx.db
                .query('ratings')
                .withIndex('by_JobId_Category', (q) =>
                    q
                        .eq('jobId', args.jobId! as Id<'jobs'>)
                        .eq('category', 'job')
                )
                .filter((q) => q.gt(q.field('ratings'), 0))
                .collect();

            if (jobRatings.length === 0) {
                return {
                    success: false,
                    message: 'No average ratings',
                };
            }

            const avg =
                parseFloat(
                    jobRatings
                        .reduce((sum, rating) => sum + rating.ratings!, 0)
                        .toFixed(2)
                ) / jobRatings.length;

            console.log('avg rating from recruiter-job:', avg);
            if (!avg) {
                return {
                    success: false,
                    message: 'Error while calculating average ratings',
                };
            }

            // update the job's rating
            await ctx.db.patch(args?.jobId! as Id<'jobs'>, {
                rating: avg,
                updatedAt: Date.now(),
            });

            // get the average ratings of recruiter's jobs
            const recruiterRatings = await ctx.db
                .query('ratings')
                .withIndex('by_RecruiterId_Category', (q) =>
                    q
                        .eq('recruiterId', args.recruiterId as Id<'users'>)
                        .eq('category', 'job')
                )
                .filter((q) => q.gt(q.field('ratings'), 0))
                .collect();

            const recruiterAvgRating =
                parseFloat(
                    recruiterRatings
                        .reduce((sum, rating) => sum + rating.ratings!, 0)
                        .toFixed(2)
                ) / recruiterRatings.length;

            console.log('avg rating from recruiter-job:', avg);
            if (!recruiterAvgRating) {
                return {
                    success: false,
                    message: 'Error while calculating average ratings',
                };
            }

            // update recruiter's rating
            const recruiter = await ctx.db
                .query('recruiters')
                .withIndex('byUserId', (q) =>
                    q.eq('userId', args.recruiterId as Id<'users'>)
                )
                .first();

            if (!recruiter) {
                return {
                    success: false,
                    message: 'Error while updating job average rating',
                };
            }

            await ctx.db.patch(recruiter._id, {
                rating: recruiterAvgRating,
                updatedAt: Date.now(),
            });

            return {
                success: true,
                message: 'Rating added successfully',
            };
        }
    },
});

// export const updateRatings = mutation({
//     args: {
//         rating: v.number(),
//         applicantId: v.optional(v.string()),
//         recruiterId: v.optional(v.string()),
//         jobId: v.optional(v.string()),
//     },
//     handler: async (ctx, args) => {
//         const userId = await getAuthUserId(ctx);

//         if (userId === null) {
//             throw new Error('You need to be logged in');
//         }

//         const user = await ctx.db.get(userId);

//         if (user === null) return;

//         if (hasPermission(user, 'ratings', 'create') === true) {
//             const rating = await ctx.db
//                 .query('ratings')
//                 .withIndex('by_ApplicantId_Recruiter_JobId_Category', (q) =>
//                     q
//                         .eq('applicantId', args?.applicantId! as Id<'users'>)
//                         .eq('recruiterId', user._id)
//                         .eq('jobId', args.jobId as Id<'jobs'>)
//                         .eq('category', 'applicant')
//                 )
//                 .first();

//             if (!rating) {
//                 const acceptedApplicant = await ctx.db
//                     .query('applications')
//                     .withIndex('by_RecruiterId_ApplicantId', (q) =>
//                         q
//                             .eq('recruiterId', user._id)
//                             .eq(
//                                 'applicantId',
//                                 args?.applicantId! as Id<'users'>
//                             )
//                     )
//                     .filter((q) =>
//                         q.or(
//                             q.eq(q.field('status'), 'accepted'),
//                             q.eq(q.field('status'), 'finished')
//                         )
//                     )
//                     .collect();

//                 const acceptedApplicantCount = acceptedApplicant.length;

//                 if (acceptedApplicantCount > 0) {
//                     const newRating = await ctx.db.insert('ratings', {
//                         category: 'applicant',
//                         applicantId: args.applicantId! as Id<'users'>,
//                         recruiterId: user._id as Id<'users'>,
//                         jobId: args.jobId as Id<'jobs'>,
//                         ratings: args.rating,
//                     });

//                     if (!newRating) {
//                         return {
//                             success: false,
//                             message: 'Error during rating',
//                         };
//                     }

//                     // get the average of ratings
//                     const applicantRatings = await ctx.db
//                         .query('ratings')
//                         .withIndex('by_Applicant_Category', (q) =>
//                             q
//                                 .eq(
//                                     'applicantId',
//                                     args.applicantId! as Id<'users'>
//                                 )
//                                 .eq('category', 'applicant')
//                         )
//                         .filter((q) => q.gt(q.field('ratings'), 0))
//                         .collect();

//                     const sum = applicantRatings.reduce(
//                         (a, { ratings: b }) => a + b!,
//                         0
//                     );

//                     const avg = sum / applicantRatings.length;

//                     console.log('recruiter avg:', avg);
//                     if (!avg) {
//                         return {
//                             success: false,
//                             message: 'Error while calculating average ratings',
//                         };
//                     }

//                     // update the applicant's rating
//                     const applicant = await ctx.db
//                         .query('applicants')
//                         .withIndex('byUserId', (q) =>
//                             q.eq('userId', args.applicantId as Id<'users'>)
//                         )
//                         .first();

//                     await ctx.db.patch(applicant?._id!, {
//                         rating: avg,
//                         updatedAt: Date.now(),
//                     });

//                     if (!applicant) {
//                         return {
//                             success: false,
//                             message:
//                                 'Error while updating applicants average rating',
//                         };
//                     }

//                     return {
//                         success: true,
//                         message: 'Rating added successfully',
//                     };
//                 } else {
//                     return {
//                         success: false,
//                         message:
//                             'Applicant did not worked under you.Hence you cannot give a rating.',
//                     };
//                 }
//             } else {
//                 // update applicant ratings
//                 await ctx.db.patch(rating._id, {
//                     ratings: args.rating,
//                     updatedAt: Date.now(),
//                 });

//                 // get the average of ratings
//                 const applicantRatings = await ctx.db
//                     .query('ratings')
//                     .withIndex('by_Applicant_Category', (q) =>
//                         q
//                             .eq('applicantId', args.applicantId! as Id<'users'>)
//                             .eq('category', 'applicant')
//                     )
//                     .filter((q) => q.gt(q.field('ratings'), 0))
//                     .collect();

//                 const sum = applicantRatings.reduce(
//                     (a, { ratings: b }) => a + b!,
//                     0
//                 );

//                 const avg = sum / applicantRatings.length;

//                 console.log('recruiter avg:', avg);
//                 if (!avg) {
//                     return {
//                         success: false,
//                         message: 'Error while calculating average ratings',
//                     };
//                 }

//                 // update the applicant's rating
//                 const applicant = await ctx.db
//                     .query('applicants')
//                     .withIndex('byUserId', (q) =>
//                         q.eq('userId', args.applicantId as Id<'users'>)
//                     )
//                     .first();

//                 await ctx.db.patch(applicant?._id!, {
//                     rating: avg,
//                     updatedAt: Date.now(),
//                 });

//                 if (!applicant) {
//                     return {
//                         success: false,
//                         message:
//                             'Error while updating applicants average rating',
//                     };
//                 }

//                 return {
//                     success: true,
//                     message: 'Rating updated successfully',
//                 };
//             }
//         } else {
//             // applicant can rate job
//             const rating = await ctx.db
//                 .query('ratings')
//                 .withIndex('by_ApplicantId_Recruiter_JobId_Category', (q) =>
//                     q
//                         .eq('applicantId', args?.applicantId! as Id<'users'>)
//                         .eq('recruiterId', args?.recruiterId! as Id<'users'>)
//                         .eq('jobId', args.jobId as Id<'jobs'>)
//                         .eq('category', 'job')
//                 )
//                 .first();

//             if (!rating) {
//                 const acceptedApplicant = await ctx.db
//                     .query('applications')
//                     .withIndex('by_ApplicantId_JobId', (q) =>
//                         q
//                             .eq('applicantId', user?._id!)
//                             .eq('jobId', args?.jobId! as Id<'jobs'>)
//                     )
//                     .filter((q) =>
//                         q.or(
//                             q.eq(q.field('status'), 'accepted'),
//                             q.eq(q.field('status'), 'finished')
//                         )
//                     )
//                     .collect();

//                 const acceptedApplicantCount = acceptedApplicant.length;

//                 if (acceptedApplicantCount > 0) {
//                     const newRating = await ctx.db.insert('ratings', {
//                         category: 'job',
//                         applicantId: args.applicantId! as Id<'users'>,
//                         recruiterId: args.recruiterId as Id<'users'>,
//                         jobId: args.jobId as Id<'jobs'>,
//                         ratings: args.rating,
//                     });

//                     if (!newRating) {
//                         return {
//                             success: false,
//                             message: 'Error when rating',
//                         };
//                     }

//                     // get the average ratings of a job
//                     const jobRatings = await ctx.db
//                         .query('ratings')
//                         .withIndex('by_JobId_Category', (q) =>
//                             q
//                                 .eq('jobId', args.jobId! as Id<'jobs'>)
//                                 .eq('category', 'job')
//                         )
//                         .filter((q) => q.gt(q.field('ratings'), 0))
//                         .collect();

//                     const sum = jobRatings.reduce(
//                         (a, { ratings: b }) => a + b!,
//                         0
//                     );

//                     const avg = sum / jobRatings.length;

//                     console.log('applicant avg:', avg);
//                     if (!avg) {
//                         return {
//                             success: false,
//                             message: 'Error while calculating average ratings',
//                         };
//                     }

//                     // update the job's rating
//                     await ctx.db.patch(args?.jobId! as Id<'jobs'>, {
//                         rating: avg,
//                         updatedAt: Date.now(),
//                     });

//                     // get the average ratings of recruiter's jobs
//                     const recruiterRatings = await ctx.db
//                         .query('ratings')
//                         .withIndex('by_RecruiterId_Category', (q) =>
//                             q
//                                 .eq(
//                                     'recruiterId',
//                                     args.recruiterId as Id<'users'>
//                                 )
//                                 .eq('category', 'job')
//                         )
//                         .filter((q) => q.gt(q.field('ratings'), 0))
//                         .collect();

//                     const sumRatings = recruiterRatings.reduce(
//                         (a, { ratings: b }) => a + b!,
//                         0
//                     );

//                     const recruiterAvg = sumRatings / recruiterRatings.length;

//                     console.log('applicant recruiterAvg:', recruiterAvg);

//                     if (!recruiterAvg) {
//                         return {
//                             success: false,
//                             message: 'Error while updating jobs average rating',
//                         };
//                     }

//                     // update recruiter's rating
//                     const recruiter = await ctx.db
//                         .query('recruiters')
//                         .withIndex('byUserId', (q) =>
//                             q.eq('userId', args.recruiterId as Id<'users'>)
//                         )
//                         .first();

//                     await ctx.db.patch(recruiter?._id!, {
//                         rating: recruiterAvg,
//                         updatedAt: Date.now(),
//                     });

//                     if (!recruiter) {
//                         return {
//                             success: false,
//                             message: 'Error while updating job average rating',
//                         };
//                     }

//                     return {
//                         success: true,
//                         message: 'Rating added successfully',
//                     };
//                 } else {
//                     return {
//                         success: false,
//                         message:
//                             'You did not work for this job. Hence you cannot give a rating.',
//                     };
//                 }
//             } else {
//                 // update job ratings
//                 await ctx.db.patch(rating._id, {
//                     ratings: args.rating,
//                     updatedAt: Date.now(),
//                 });

//                 // get the average jobs ratings
//                 const jobRatings = await ctx.db
//                     .query('ratings')
//                     .withIndex('by_JobId_Category', (q) =>
//                         q
//                             .eq('jobId', args.jobId! as Id<'jobs'>)
//                             .eq('category', 'job')
//                     )
//                     .filter((q) => q.gt(q.field('ratings'), 0))
//                     .collect();

//                 const sum = jobRatings.reduce((a, { ratings: b }) => a + b!, 0);

//                 const avg = sum / jobRatings.length;

//                 console.log('recruiter avg:', avg);
//                 if (!avg) {
//                     return {
//                         success: false,
//                         message: 'Error while calculating average rating',
//                     };
//                 }

//                 // update the job's rating
//                 await ctx.db.patch(args?.jobId! as Id<'jobs'>, {
//                     rating: avg,
//                     updatedAt: Date.now(),
//                 });

//                 // get the average ratings of recruiter's jobs
//                 const recruiterRatings = await ctx.db
//                     .query('ratings')
//                     .withIndex('by_RecruiterId_Category', (q) =>
//                         q
//                             .eq('recruiterId', args.recruiterId as Id<'users'>)
//                             .eq('category', 'job')
//                     )
//                     .filter((q) => q.gt(q.field('ratings'), 0))
//                     .collect();

//                 const sumRatings = recruiterRatings.reduce(
//                     (a, { ratings: b }) => a + b!,
//                     0
//                 );

//                 const recruiterAvg = sumRatings / recruiterRatings.length;

//                 console.log('applicant recruiterAvg:', recruiterAvg);

//                 if (!recruiterAvg) {
//                     return {
//                         success: false,
//                         message: 'Error while calculating average rating',
//                     };
//                 }

//                 // update recruiter's rating
//                 const recruiter = await ctx.db
//                     .query('recruiters')
//                     .withIndex('byUserId', (q) =>
//                         q.eq('userId', args.recruiterId as Id<'users'>)
//                     )
//                     .first();

//                 await ctx.db.patch(recruiter?._id!, {
//                     rating: recruiterAvg,
//                     updatedAt: Date.now(),
//                 });

//                 if (!recruiter) {
//                     return {
//                         success: true,
//                         message:
//                             'Error while updating recruiters average rating',
//                     };
//                 }

//                 return {
//                     success: true,
//                     message: 'Rating updated successfully',
//                 };
//             }
//         }
//     },
// });
