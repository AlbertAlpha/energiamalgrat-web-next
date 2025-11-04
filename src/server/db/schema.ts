import { sql } from "drizzle-orm";
import { index, int, mysqlTableCreator, primaryKey, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
const createTable = mysqlTableCreator((name) => `emalgrat-web_${name}`);

const timestampsColumns = {
  createdBy: int()
    .notNull()
    .references(() => users.userId),
  createdAt: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
};

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: int().notNull().autoincrement().unique(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).unique(),
  emailVerified: timestamp({
    mode: "date",
    fsp: 3,
  }),
  image: varchar({ length: 255 }),
  createdAt: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
});

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", {
      length: 255,
    }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    index("account_user_idx").on(account.userId),
  ],
);

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 }).primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => [index("session_user_idx").on(session.userId)],
);

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })],
);

export const posts = createTable(
  "post",
  {
    id: int().primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }),
    ...timestampsColumns,
  },
  (post) => [index("post_created_by_idx").on(post.createdBy)],
);

export const events = createTable(
  "event",
  {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 255 }),
    description: text(),
    location: varchar({ length: 255 }),
    startDate: timestamp().notNull(),
    endDate: timestamp().notNull(),
    ...timestampsColumns,
  },
  (event) => [index("event_start_idx").on(event.startDate)],
);
