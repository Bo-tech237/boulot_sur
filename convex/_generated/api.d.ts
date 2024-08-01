/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.13.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as applicants from "../applicants.js";
import type * as applications from "../applications.js";
import type * as auth from "../auth.js";
import type * as categories from "../categories.js";
import type * as comments from "../comments.js";
import type * as email from "../email.js";
import type * as helpers from "../helpers.js";
import type * as http from "../http.js";
import type * as jobs from "../jobs.js";
import type * as ratings from "../ratings.js";
import type * as recruiters from "../recruiters.js";
import type * as uploads from "../uploads.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  applicants: typeof applicants;
  applications: typeof applications;
  auth: typeof auth;
  categories: typeof categories;
  comments: typeof comments;
  email: typeof email;
  helpers: typeof helpers;
  http: typeof http;
  jobs: typeof jobs;
  ratings: typeof ratings;
  recruiters: typeof recruiters;
  uploads: typeof uploads;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
