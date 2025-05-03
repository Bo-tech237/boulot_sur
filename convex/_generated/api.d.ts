/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as admin from "../admin.js";
import type * as applicants from "../applicants.js";
import type * as applications from "../applications.js";
import type * as auth from "../auth.js";
import type * as categories from "../categories.js";
import type * as comments from "../comments.js";
import type * as email from "../email.js";
import type * as http from "../http.js";
import type * as jobs from "../jobs.js";
import type * as lib_permissions from "../lib/permissions.js";
import type * as magiclink from "../magiclink.js";
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
  admin: typeof admin;
  applicants: typeof applicants;
  applications: typeof applications;
  auth: typeof auth;
  categories: typeof categories;
  comments: typeof comments;
  email: typeof email;
  http: typeof http;
  jobs: typeof jobs;
  "lib/permissions": typeof lib_permissions;
  magiclink: typeof magiclink;
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
