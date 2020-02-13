import Avatar from "./Avatar";
import avatarStore from "./model";
import { createModule } from "core";

const AvatarModule = createModule("avatar", async () => Avatar, avatarStore);

export default AvatarModule.create();
