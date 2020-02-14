import {
  types as t,
  onSnapshot,
  getRoot,
  IStateTreeNode
} from "mobx-state-tree";

import { ModuleState } from "core";

const RoleModel = ModuleState("RoleState", {
  roleName: t.string
})
  .actions($ => ({
    setRole(role: string) {
      $.roleName = role;
    }
  }))
  .actions($ => ({
    afterAttach() {
      const store = getRoot<{
        core: { user: IStateTreeNode };
      }>($);
      onSnapshot(store.core.user, patch => {
        if (patch.name === "admin") {
          $.setRole("admin");
        }
      });
    }
  }));

const roleStore = RoleModel.create({ roleName: "client" });

export default roleStore;
