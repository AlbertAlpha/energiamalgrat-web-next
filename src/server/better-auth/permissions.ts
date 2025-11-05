import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  userAc,
} from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  post: ["list", "create", "share", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  post: ["list"],
  ...userAc.statements,
});

export const admin = ac.newRole({
  post: ["list", "create", "update"],
  ...adminAc.statements,
});
