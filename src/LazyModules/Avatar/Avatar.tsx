import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Avatar, Badge } from "antd";

import { useStore } from "core";

const UserAvatar = () => {
  const { store } = useStore();
  return (
    <>
      {store.url && (
        <>
          <Badge count={store.addon}>
            <Avatar shape="circle" src={store.url} />
          </Badge>
        </>
      )}
    </>
  );
};

export default observer(UserAvatar);
