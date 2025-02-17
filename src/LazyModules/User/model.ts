import { types as t, flow } from "mobx-state-tree";
import Axios from "axios";

import { ModuleState } from "core";

const ExtendedUser = ModuleState("ExtendedUser", {
  userPet: t.maybe(t.string)
}).actions($ => ({
  afterAttach: flow(function*() {
    const {
      data: { message }
    } = yield Axios.get<{ message: string }>(
      "https://dog.ceo/api/breeds/image/random"
    );
    $.userPet = message;
  })
}));

const extnedUserStore = ExtendedUser.create();

export default extnedUserStore;
