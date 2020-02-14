import React from "react";
import { Icon } from "antd";
import { createReactModule } from "core";

import roleStore from "./model";
import sleep from "utils/sleep";

async function RoleLoader() {
  await sleep(5);
  const Role = await import("./Role");
  return Role.default;
}

export default createReactModule(
  "role",
  roleStore,
  RoleLoader,
  <Icon type="bug" />
);
