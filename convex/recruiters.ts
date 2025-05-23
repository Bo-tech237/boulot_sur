import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";
import {
  getAll,
  getOneFrom,
  getManyFrom,
  getManyVia,
} from "convex-helpers/server/relationships";
import { asyncMap } from "convex-helpers";
import { getAuthUserId } from "@convex-dev/auth/server";
import { hasPermission } from "./lib/permissions";

export const getAllRecruiters = query({
  args: {},
  handler: async (ctx) => {
    const recruiters = await ctx.db.query("recruiters").order("desc").collect();

    const recruitersWithUsers = await asyncMap(
      recruiters,
      async (recruiter) => {
        const user = await ctx.db.get(recruiter?.userId!);

        return { recruiter, user };
      }
    );

    return recruitersWithUsers;
  },
});

export const getRecruiterById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (user === null) return;

    const recruiter = await getOneFrom(
      ctx.db,
      "recruiters",
      "byUserId",
      user?._id,
      "userId"
    );
    return { ...user, ...recruiter };
  },
});

export const getRecruiter = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) return;

    const user = await ctx.db.get(userId);

    if (!user) return;

    const recruiter = await getOneFrom(
      ctx.db,
      "recruiters",
      "byUserId",
      userId,
      "userId"
    );

    if (!recruiter) return;

    return { ...user, ...recruiter };
  },
});

export const getRecruiterOnlyById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const recruiter = await getOneFrom(
      ctx.db,
      "recruiters",
      "byUserId",
      args.userId,
      "userId"
    );
    return recruiter;
  },
});

export const createRecruiter = mutation({
  args: {
    phone: v.number(),
    country: v.string(),
    city: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      throw new Error("You need to be logged in");
    }

    const user = await ctx.db.get(userId);
    console.log("recruiter", hasPermission(user!, "recruiters", "create"));

    if (!user || !hasPermission(user, "recruiters", "create")) {
      return {
        success: false,
        message: "You must be a user",
      };
    }

    const recruiterId = await ctx.db.insert("recruiters", {
      userId: userId,
      phone: args.phone,
      country: args.country,
      city: args.city,
      description: args.description,
      rating: 0,
    });

    if (recruiterId === null) {
      return { success: false, message: "Error try again" };
    }

    await ctx.scheduler.runAfter(0, api.email.newUserEmail, {
      email: user?.email!,
      name: user?.name!,
    });

    await ctx.db.patch(userId, { roles: ["user", "recruiter"] });

    return {
      success: true,
      message: "Recruiter account created successfully",
    };
  },
});

export const updateRecruiter = mutation({
  args: {
    recruiterId: v.id("recruiters"),
    phone: v.number(),
    country: v.string(),
    city: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      throw new Error("You need to be logged in");
    }

    const user = await ctx.db.get(userId);

    if (!user || !hasPermission(user, "recruiters", "update")) {
      return { success: false, message: "You must be a recruiter" };
    }

    await ctx.db.patch(args.recruiterId, {
      phone: args.phone,
      country: args.country,
      city: args.city,
      description: args.description,
      updatedAt: Date.now(),
    });

    return {
      success: true,
      message: `Recruiter ${user.name} updated successfully`,
    };
  },
});

export const deleteRecruiter = mutation({
  args: { recruiterId: v.id("users") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return {
        success: false,
        message: "You need to be logged in.",
      };
    }

    const user = await ctx.db.get(args.recruiterId);

    if (!user || !hasPermission(user, "recruiters", "delete")) {
      return {
        success: false,
        message: "You have no permissions to delete a recruiter",
      };
    }

    const acceptedApplications = await ctx.db
      .query("applications")
      .withIndex("byRecruiterId", (q) => q.eq("recruiterId", user._id))
      .filter((q) => q.eq(q.field("status"), "accepted"))
      .collect();

    if (acceptedApplications.length > 0) {
      return {
        success: false,
        message: `${user.name} you can't delete your account now because jobs are still on going.`,
      };
    }

    const recruiter = await getOneFrom(
      ctx.db,
      "recruiters",
      "byUserId",
      user?._id,
      "userId"
    );

    const myJobs = await ctx.db
      .query("jobs")
      .withIndex("byUserId", (q) => q.eq("userId", args.recruiterId))
      .collect();

    const myApplications = await ctx.db
      .query("applications")
      .withIndex("byRecruiterId", (q) => q.eq("recruiterId", args.recruiterId))
      .collect();

    const myRatings = await ctx.db
      .query("ratings")
      .withIndex("byRecruiterId", (q) => q.eq("recruiterId", args.recruiterId))
      .filter((q) => q.eq(q.field("category"), "job"))
      .collect();

    const sessionToDelete = await getOneFrom(
      ctx.db,
      "authSessions",
      "userId",
      user?._id,
      "userId"
    );
    const accountToDelete = await ctx.db
      .query("authAccounts")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .unique();

    const refreshToDelete = await getOneFrom(
      ctx.db,
      "authRefreshTokens",
      "sessionId",
      sessionToDelete?._id!,
      "sessionId"
    );
    const verficationToDelete = await getOneFrom(
      ctx.db,
      "authVerificationCodes",
      "accountId",
      accountToDelete?._id!,
      "accountId"
    );
    const verifierToDelete = await ctx.db
      .query("authVerifiers")
      .filter((q) => q.eq(q.field("sessionId"), sessionToDelete?._id))
      .unique();
    const rateLimitToDelete = await ctx.db
      .query("authRateLimits")
      .filter((q) => q.eq(q.field("identifier"), user._id))
      .unique();

    const authTableArray = [
      user,
      sessionToDelete,
      accountToDelete,
      refreshToDelete,
      verficationToDelete,
      verifierToDelete,
      rateLimitToDelete,
    ];

    await asyncMap(authTableArray, async (authTable) => {
      if (authTable !== null) {
        return await ctx.db.delete(authTable?._id!);
      }
    });

    await ctx.db.delete(recruiter?._id!);

    await asyncMap(myJobs, async (myJob) => {
      return await ctx.db.delete(myJob._id);
    });

    await asyncMap(myApplications, async (myApplication) => {
      return await ctx.db.delete(myApplication._id);
    });

    await asyncMap(myRatings, async (myRating) => {
      return await ctx.db.delete(myRating._id);
    });

    await ctx.scheduler.runAfter(0, api.email.deleteUserEmail, {
      email: user?.email!,
      name: user?.name!,
    });

    return {
      success: true,
      message: `Recruiter '${user.name}' deleted successfully`,
    };
  },
});

export const getRecruiterStats = query({
  args: {},
  returns: v.object({
    totalJobs: v.number(),
    activeJobs: v.number(),
    totalApplications: v.number(),
    accepted: v.number(),
  }),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { totalJobs: 0, activeJobs: 0, totalApplications: 0, accepted: 0 };
    }

    // Total jobs posted by recruiter
    const jobs = await ctx.db
      .query("jobs")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .collect();
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter(
      (j) => (j.activeApplications ?? 0) > 0
    ).length;

    // Total applications received for recruiter's jobs
    const applications = await ctx.db
      .query("applications")
      .withIndex("byRecruiterId", (q) => q.eq("recruiterId", userId))
      .collect();
    const totalApplications = applications.length;
    const accepted = applications.filter((a) => a.status === "accepted").length;

    return { totalJobs, activeJobs, totalApplications, accepted };
  },
});
