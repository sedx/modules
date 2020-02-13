import { createModule } from "core";

import roleStore from "./model";
import sleep from "utils/sleep";

async function RoleLoader() {
  await sleep(5);
  const Role = await import("./Role");
  return Role.default;
}

const RoleModule = createModule("role", RoleLoader, roleStore);

export default RoleModule.create();
