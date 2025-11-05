import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "~/env";
import { ac, admin, user } from "./permissions";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: env.BETTER_AUTH_URL,
  plugins: [
    adminClient({
      ac,
      roles: { admin, user },
    }),
  ],
});

export type Session = typeof authClient.$Infer.Session;
