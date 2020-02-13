import React, { useMemo, useContext } from "react";
import { observer } from "mobx-react";
import { Card, Button } from "antd";

import { StoreContext, RenderModule } from "core";

const UserInfo: React.FC = ({ children }) => {
  const { rootStore, store }: any = useContext(StoreContext);
  const role = useMemo(() => {
    try {
      return rootStore.modules.role.state;
    } catch (e) {
      return null;
    }
  }, [rootStore]);
  return (
    <Card
      title={
        <>
          <RenderModule
            moduleName="avatar"
            container="span"
            style={{ display: "inline-block" }}
          />
          {rootStore.core.user.name}
        </>
      }
      cover={
        <div
          style={{
            height: "100px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${store.userPet})`
          }}
        />
      }
    >
      {children}
      {role && (
        <p>
          Роль пользователя {role.roleName}
          <Button onClick={() => role.setRole("tester")}>
            Сделать пользователя тестровщиком
          </Button>
        </p>
      )}
    </Card>
  );
};

export default observer(UserInfo);
