import {
  types as t,
  onSnapshot,
  getRoot,
  IStateTreeNode
} from "mobx-state-tree";
import get from "lodash.get";

import { ModuleState } from "core";

const Avatar = ModuleState("avatar", {
  url: "",
  addon: ""
})
  .actions($ => ({
    setAvatar(name) {
      if (!name) {
        $.url = "";
        return;
      }
      const num = name
        .split("")
        .map(c => c.charCodeAt(0))
        .join("");
      $.url = `https://secure.gravatar.com/avatar/${num}?s=80&d=identicon`;
    },
    setAddon(role: string) {
      $.addon = role.toUpperCase()[0];
    }
  }))
  .actions($ => ({
    afterAttach() {
      const store = getRoot<{
        core: { user: IStateTreeNode };
      }>($);

      const initName = get(store, "core.user.name");
      initName && $.setAvatar(initName);

      // Если модуль ролей загружен....
      const role = get(store, "modules.role.state");
      if (role) {
        $.setAddon(role.roleName);
      }

      $.module.onlyWhenVisible(function*() {
        // Подписываемся на изменения пользователя
        yield onSnapshot(store.core.user, ({ name }) => {
          $.setAvatar(name);
        });

        if (role) {
          // При изменении ставим аддон
          yield onSnapshot(role, ({ roleName }: { roleName: string }) => {
            $.setAddon(roleName);
          });
        }
      });
    }
  }));

const avatarStore = Avatar.create();

export default avatarStore;
