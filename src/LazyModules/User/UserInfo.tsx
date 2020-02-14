import React, { useMemo, useContext, useState } from "react";
import { observer } from "mobx-react";
import { Card, Button } from "antd";

import { StoreContext, RenderModule } from "core";

const AvatarToggle = () => {
  const [s, setS] = useState(true);
  if (s) {
    return (
      <div style={{ position: "relative" }}>
        <RenderModule
          id="avatar"
          container="span"
          style={{ display: "inline-block" }}
        />
        <Button
          shape="circle"
          icon="close"
          onClick={() => setS(false)}
          style={{ position: "absolute", top: 0, right: 0 }}
        />
      </div>
    );
  }
  return <Button onClick={() => setS(true)}>Показать аватар</Button>;
};

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
          <AvatarToggle />
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
