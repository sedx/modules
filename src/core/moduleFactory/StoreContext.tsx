import React, { createContext } from "react";

export const StoreContext = createContext<any>(null);

export default function StoreProvider({ store, rootStore, children }: any) {
  return (
    <StoreContext.Provider value={{ store, rootStore }}>
      {children}
    </StoreContext.Provider>
  );
}
