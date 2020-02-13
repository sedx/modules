import { types as t, getType, getSnapshot } from "mobx-state-tree";

import Core from "core/models";

export default async function loadModules(
  ...modulesNsmes: Array<string | undefined>
) {
  const modules = await Promise.all(
    modulesNsmes
      .filter(Boolean)
      .map(m => import(`../LazyModules/${m}`).catch(() => null))
  );
  const [modulesType, modulesInitData] = modules.filter(Boolean).reduce(
    (acc, { default: d }) => {
      const [types, init] = acc;
      return [
        { ...types, [d.moduleName]: getType(d) },
        { ...init, [d.moduleName]: getSnapshot(d) }
      ];
    },
    [{}, {}]
  );
  const modulesModel = t.model("Modules", modulesType);

  return t.model("Store", {
    core: t.optional(Core, {}),
    modules: t.optional(modulesModel, modulesInitData)
  });
}
