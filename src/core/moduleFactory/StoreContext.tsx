import React, { createContext, useContext } from "react";

const StoreContext = createContext<any>(null);

export default function StoreProvider({ store, rootStore, children }: any) {
  return (
    <StoreContext.Provider value={{ store, rootStore }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore<ModuleStore = object, RootStore = object>(): {
  store: ModuleStore;
  rootStore: RootStore;
} {
  const stores = useContext(StoreContext);
  if (!stores) {
    throw new Error("You should wrapp components to StoreProvider");
  }
  return stores;
}
