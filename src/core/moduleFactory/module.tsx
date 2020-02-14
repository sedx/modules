import React from "react";
import {
  types as t,
  getType,
  getSnapshot,
  onPatch,
  getParent,
  Instance,
  IDisposer,
  ModelPropertiesDeclaration
} from "mobx-state-tree";
import { render as renderReact, unmountComponentAtNode } from "react-dom";
import ComponentLoader from "./ComponentLoader";
import StoreContext from "./StoreContext";

const VisibleModule = t
  .model({
    isShown: false
  })
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

export default function createModule(
  // Id моудля
  id: string,
  // Загрузчик вьюхи
  // Нужен для тех кейсов когда модуль отрисовывается не сразу, но есть какая-то логика завязанная на дургие модули
  component: () => Promise<React.ComponentType>,
  // store  состояния моудля
  model: any,
  icon: React.ReactElement
) {
  return VisibleModule.named(id)
    .props({
      id,
      state: t.optional(getType(model), getSnapshot(model))
    })
    .views($ => ({
      get icon() {
        return icon;
      }
    }))
    .actions($ => ({
      setIsShown(v: boolean) {
        $.isShown = v;
      }
    }))
    .actions($ => {
      const ModuleWrapper: React.FC = ({ children }) => <>{children}</>;
      ModuleWrapper.displayName = `Module:${$.id}`;
      return {
        render(node: HTMLElement, store, props) {
          renderReact(
            <ModuleWrapper>
              <StoreContext store={store.modules[id].state} rootStore={store}>
                <ComponentLoader component={component} id={id} {...props} />
              </StoreContext>
            </ModuleWrapper>,
            node,
            () => $.setIsShown(true)
          );
          return () => {
            $.setIsShown(false);
            unmountComponentAtNode(node);
          };
        }
      };
    });
}
export const ModuleState = <P extends ModelPropertiesDeclaration = {}>(
  name: string,
  props: P
) => {
  const model = t.model(name, props).views($ => ({
    get module() {
      return getParent<Instance<typeof VisibleModule>>($);
    }
  }));
  return model;
};
