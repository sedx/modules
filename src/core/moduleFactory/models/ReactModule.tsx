import React, { ComponentType } from "react";
import { render as reactRender, unmountComponentAtNode } from "react-dom";
import ReactDOMServer from "react-dom/server";
import createModule from "./Module";
import StoreProvider from "../StoreContext";
import ComponentLoader from "../ComponentLoader";

export default function createReactModule<T>(
  id: string,
  store: T,
  component: ComponentLoader,
  icon: React.ReactElement
) {
  const module = createModule(id, store);
  const ReactModule = module
    .views(() => ({
      get icon() {
        return ReactDOMServer.renderToStaticMarkup(icon);
      }
    }))
    .actions($ => {
      const ModuleWrapper: React.FC = ({ children }) => <>{children}</>;
      ModuleWrapper.displayName = `Module:${id}`;
      return {
        render(node: HTMLElement, store: any, props: object) {
          reactRender(
            <ModuleWrapper>
              <StoreProvider store={store.modules[id].state} rootStore={store}>
                <ComponentLoader component={component} id={id} {...props} />
              </StoreProvider>
            </ModuleWrapper>,
            node,
            () => {
              $.setIsShown(true);
            }
          );
          return () => {
            $.setIsShown(false);
            unmountComponentAtNode(node);
          };
        }
      };
    });
  return ReactModule.create({ id });
}
