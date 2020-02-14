import {
  types as t,
  ModelPropertiesDeclaration,
  Instance,
  getParent
} from "mobx-state-tree";

import MountableModule from "./MountableModule";

const ModuleState = <P extends ModelPropertiesDeclaration = {}>(
  name: string,
  props: P
) => {
  const model = t.model(name, props).views($ => ({
    get module() {
      return getParent<Instance<typeof MountableModule>>($);
    }
  }));
  return model;
};

export default ModuleState;
