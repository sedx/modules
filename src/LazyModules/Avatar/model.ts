import {
  types as t,
  onSnapshot,
  getRoot,
  IStateTreeNode
} from "mobx-state-tree";
import get from "lodash.get";

const Avatar = t
  .model("avatar", {
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
    },
    afterAttach() {
      const store = getRoot<{
        core: { user: IStateTreeNode };
      }>($);
      const initName = get(store, "core.user.name");
      initName &&
        // @ts-ignore
        $.setAvatar(initName);
      // Подписываемся на изменения пользователя
      onSnapshot(store.core.user, ({ name }) => {
        // @ts-ignore
        $.setAvatar(name);
      });

      // Если модуль ролей загружен....
      const role = get(store, "modules.role.state");
      if (role) {
        // @ts-ignore
        $.setAddon(role.roleName);
        // При изменении ставим аддон
        onSnapshot(role, ({ roleName }: { roleName: string }) => {
          // @ts-ignore
          $.setAddon(roleName);
        });
      }
    }
  }));

const avatarStore = Avatar.create();

export default avatarStore;
