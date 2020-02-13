import {
  types as t,
  onSnapshot,
  getRoot,
  IStateTreeNode
} from "mobx-state-tree";

const RoleModel = t
  .model("RoleState", {
    roleName: t.string
  })
  .actions($ => ({
    // @ts-ignore
    setRole(role: string) {
      $.roleName = role;
    },
    // @ts-ignore
    afterAttach() {
      const store = getRoot<{
        core: { user: IStateTreeNode };
      }>($);
      onSnapshot(store.core.user, patch => {
        if (patch.name === "admin") {
          // @ts-ignore
          $.setRole("admin");
        }
      });
    }
  }));

const roleStore = RoleModel.create({ roleName: "client" });

export default roleStore;
