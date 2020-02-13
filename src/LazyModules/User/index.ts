import { createModule } from "core";
import user from "./model";

async function UserDetailLoaded() {
  const User = await import("./UserInfo");
  return User.default;
}

const UserModule = createModule("userDetails", UserDetailLoaded, user);

export default UserModule.create();
