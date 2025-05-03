import { convexAuth } from "@convex-dev/auth/server";
import Google from "@auth/core/providers/google";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Google,
    // {
    //   id: "brevo",
    //   type: "email",
    //   from: process.env.GMAIL_USER!,
    //   server: {},
    //   maxAge: 24 * 60 * 60,
    //   name: "Email",
    //   options: {},
    //   sendVerificationRequest: async (params) => {
    //     const { identifier: email, url } = params;
    //   },
    // },
  ],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, args) {
      if (args.existingUserId) return;

      if (args.profile?.email === "kouertechnology@gmail.com") {
        return await ctx.db.patch(args.userId, {
          roles: ["user", "admin"],
        });
      } else {
        return await ctx.db.patch(args.userId, {
          roles: ["user"],
        });
      }
    },
  },
});
