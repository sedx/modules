import React from "react";
import { types as t, getType, getSnapshot } from "mobx-state-tree";
import { render as renderReact } from "react-dom";
import ComponentLoader from "./ComponentLoader";
import StoreContext from "./StoreContext";

export default function createModule(
  // Id моудля
  name: string,
  // Загрузчик вьюхи
  // Нужен для тех кейсов когда модуль отрисовывается не сразу, но есть какая-то логика завязанная на дургие модули
  component: () => Promise<React.ComponentType>,
  // store  состояния моудля
  model: any
) {
  return t
    .model(name, {
      moduleName: name,
      state: t.optional(getType(model), getSnapshot(model))
    })
    .actions($ => {
      return {
        render(node: HTMLElement, store, props) {
          renderReact(
            <StoreContext store={store.modules[name].state} rootStore={store}>
              <ComponentLoader component={component} name={name} {...props} />
            </StoreContext>,
            node
          );
        }
      };
    });
}
