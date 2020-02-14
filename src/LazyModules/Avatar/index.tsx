import React from "react";

import Avatar from "./Avatar";
import avatarStore from "./model";
import { createReactModule } from "core";
import { Icon } from "antd";

export default createReactModule(
  "avatar",
  avatarStore,
  async () => Avatar,
  <Icon type="aliwangwang" />
);
