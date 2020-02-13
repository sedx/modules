import React from "react";

import Avatar from "./Avatar";
import avatarStore from "./model";
import { createModule } from "core";
import { Icon } from "antd";

const AvatarModule = createModule(
  "avatar",
  async () => Avatar,
  avatarStore,
  <Icon type="aliwangwang" />
);

export default AvatarModule.create();
