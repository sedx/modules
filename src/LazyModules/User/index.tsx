import React from "react";
import { Icon, Badge } from "antd";
import { createReactModule } from "core";
import user from "./model";

async function UserDetailLoaded() {
  const User = await import("./UserInfo");
  return User.default;
}

export default createReactModule(
  "userDetails",
  user,
  UserDetailLoaded,
  <Icon type="contacts" />
);
