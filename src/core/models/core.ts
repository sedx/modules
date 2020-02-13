import { types as t } from "mobx-state-tree";

import { User } from "./user";

export const Core = t.model("Core", {
  user: t.optional(User, {})
});
