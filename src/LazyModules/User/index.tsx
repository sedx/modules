import React from "react";
import { Icon } from "antd";
import { createModule } from "core";
import user from "./model";

async function UserDetailLoaded() {
  const User = await import("./UserInfo");
  return User.default;
}

const UserModule = createModule(
  "userDetails",
  UserDetailLoaded,
  user,
  <Icon type="contacts" />
);

export default UserModule.create();
