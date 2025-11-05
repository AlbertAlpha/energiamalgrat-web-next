import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin as adminPlugin } from "better-auth/plugins";
import { env } from "~/env";
import { db } from "~/server/db";
import { ac, admin, user } from "./permissions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql", // or "pg" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    adminPlugin({
      ac,
      roles: { admin, user },
    }),
    nextCookies(),
  ],
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
      redirectURI: `${env.BETTER_AUTH_URL}/api/auth/callback/github`,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
