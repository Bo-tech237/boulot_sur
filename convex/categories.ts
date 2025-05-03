import { Id } from "./_generated/dataModel";
import { query, mutation } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { getManyFrom } from "convex-helpers/server/relationships";
import { asyncMap } from "convex-helpers";
import { authTables } from "@convex-dev/auth/server";

// Get all categories
export const getAllCategories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("categories").order("desc").collect();
  },
});

// Add a new category
export const addCategory = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("categories", {
      name: args.name,
      updatedAt: Date.now(),
    });
  },
});

// Edit a category
export const editCategory = mutation({
  args: { categoryId: v.id("categories"), name: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.categoryId, {
      name: args.name,
      updatedAt: Date.now(),
    });
  },
});

// Delete a category
export const deleteCategory = mutation({
  args: { categoryId: v.id("categories") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.categoryId);
  },
});

export const getCategoriesWithTotalJobs = query({
  args: {},
  handler: async (ctx) => {
    const categories = await ctx.db.query("categories").order("asc").collect();

    const categoryWithTotalJobs = await asyncMap(
      categories,
      async (category) => {
        const jobsResult = await getManyFrom(
          ctx.db,
          "jobs",
          "byCategory",
          category.name,
          "category"
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
    const categories = await ctx.db.query("categories").order("asc").take(6);

    const categoryWithTotalJobs = await asyncMap(
      categories,
      async (category) => {
        const jobsResult = await getManyFrom(
          ctx.db,
          "jobs",
          "byCategory",
          category.name,
          "category"
        );

        return { category, totalJobs: jobsResult.length };
      }
    );

    if (!categoryWithTotalJobs) return;

    return categoryWithTotalJobs;
  },
});
