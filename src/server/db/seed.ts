import { drizzle } from "drizzle-orm/node-postgres";
import { reset, seed } from "drizzle-seed";
import { env } from "~/env";

import * as schema from "./schema";

async function main() {
  const db = drizzle(env.DATABASE_URL);
  await reset(db, schema);
  await seed(db, { user: schema.user });
  await seed(db, { post: schema.post });
}

main();
