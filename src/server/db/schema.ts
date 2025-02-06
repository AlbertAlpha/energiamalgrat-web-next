import { relations, sql } from 'drizzle-orm';
import { index, integer, pgTableCreator, primaryKey, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { type AdapterAccount } from 'next-auth/adapters';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
const createTable = pgTableCreator((name) => `emalgrat-web_${name}`);

const userIdColumnRef = integer()
  .notNull()
  .references(() => users.id);

const timestampsColumns = {
  createdBy: integer()
    .notNull()
    .references(() => users.id),
  createdAt: timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
};

export const users = createTable('user', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  uuid: varchar({ length: 36 })
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar({ length: 255 }),
  email: varchar({ length: 100 }).notNull(),
  emailVerified: timestamp({
    mode: 'date',
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar({ length: 255 }),
  createdAt: timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  'account',
  {
    userId: userIdColumnRef,
    type: varchar({ length: 50 }).$type<AdapterAccount['type']>().notNull(),
    provider: varchar({ length: 50 }).notNull(),
    providerAccountId: varchar({
      length: 255,
    }).notNull(),
    refresh_token: text(),
    access_token: text(),
    expires_at: integer(),
    token_type: varchar({ length: 255 }),
    scope: varchar({ length: 255 }),
    id_token: text(),
    session_state: varchar({ length: 255 }),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    index('account_user_idx').on(account.userId),
  ],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  'session',
  {
    sessionToken: varchar({ length: 255 }).notNull().primaryKey(),
    userId: userIdColumnRef,
    expires: timestamp({
      mode: 'date',
      withTimezone: true,
    }).notNull(),
  },
  (session) => [index('session_user_idx').on(session.userId)],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  'verification_token',
  {
    identifier: varchar({ length: 255 }).notNull(),
    token: varchar({ length: 255 }).notNull(),
    expires: timestamp({
      mode: 'date',
      withTimezone: true,
    }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })],
);

export const posts = createTable(
  'post',
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    name: varchar('name', { length: 255 }),
    ...timestampsColumns,
  },
  (post) => [index('post_created_by_idx').on(post.createdBy)],
);

export const events = createTable(
  'event',
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    name: varchar({ length: 255 }),
    description: text(),
    location: varchar({ length: 255 }),
    startDate: timestamp({ withTimezone: true }).notNull(),
    endDate: timestamp({ withTimezone: true }).notNull(),
    ...timestampsColumns,
  },
  (event) => [index('event_start_idx').on(event.startDate)],
);
