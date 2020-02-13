import { types as t } from "mobx-state-tree";

export const User = t
  .model("User", {
    name: "Jane Doe"
  })
  .actions($ => ({
    login(name: string) {
      $.name = name;
    }
  }));
