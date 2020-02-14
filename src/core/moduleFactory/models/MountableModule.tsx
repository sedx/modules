import { types as t, IDisposer, onPatch } from "mobx-state-tree";

const MountableModule = t
  .model({
    id: t.string,
    isShown: false
  })
  .actions($ => ({
    setIsShown(v: boolean) {
      $.isShown = v;
    }
  }))
  .actions($ => ({
    onlyWhenVisible(fn: () => Generator<IDisposer>) {
      let disposers: IDisposer[] = [];
      onPatch($, ({ path, value }) => {
        if (path !== "/isShown") return;
        if (value) {
          for (let value of fn()) {
            disposers.push(value);
          }
        } else {
          disposers.forEach(d => d());
          disposers = [];
        }
      });
    }
  }));

export default MountableModule;
