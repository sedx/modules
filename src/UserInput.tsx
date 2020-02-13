import React, { useContext } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "core";
import { Input } from "antd";

// Комопнент для изменения глобального имени пользователя
const UserInput = () => {
  const { rootStore }: any = useContext(StoreContext);
  return (
    <label>
      Имя пользователя: &nbsp;
      <Input
        value={rootStore.core.user.name}
        onChange={e => rootStore.core.user.login(e.target.value)}
      />
      {/* Если загружен модуль роли */}
      {rootStore.modules.role && (
        <span>Введите admin для того чтобы изменить роль</span>
      )}
    </label>
  );
};

export default observer(UserInput);
