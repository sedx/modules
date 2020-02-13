import React, { useContext } from "react";
import { observer } from "mobx-react";

import { StoreContext } from "core";

const ROLES = ["admin", "tester", "client"];

const Role = () => {
  const { store, rootStore }: any = useContext(StoreContext);
  return (
    <label>
      Роль пользователя {rootStore.core.user.name}:
      <select
        onChange={e => store.setRole(e.target.value)}
        value={store.roleName}
      >
        {ROLES.map(r => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </label>
  );
};

export default observer(Role);
