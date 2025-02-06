import { drizzle } from 'drizzle-orm/node-postgres';
import { reset, seed } from 'drizzle-seed';

import * as schema from './schema';
import { events, users } from './schema';

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await reset(db, schema);
  await seed(db, { users });
  await seed(db, { events });
}

main();
