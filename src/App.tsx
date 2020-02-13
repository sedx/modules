import React, { useState, useEffect } from "react";
import track from "mobx-devtools-mst";

import StoreProvider from "core/moduleFactory/StoreContext";
import loadModules from "core";
import Content from "Content";
import { Spin } from "antd";
import sleep from "utils/sleep";
import activeModules from "utils/activeModules";

async function createStore() {
  // Список доступных модулей может приходить для пользователя из SSO или с другого сервера.
  // Для простых кейсов можно читать его из JSON которы будет лежать рядом с билдом
  await sleep(5);
  const RootStore = await loadModules(...activeModules);
  const store = RootStore.create();
  track(store);
  return store;
}

export default function App() {
  const [store, setStore] = useState<unknown>(null);
  useEffect(() => {
    createStore().then(setStore);
  }, []);

  if (!store) {
    return (
      <>
        <Spin />
        <h1>Загружаем модули и инициализируем приложение</h1>
        <code>Будут загружены модули: {activeModules.join(",")}</code>
        <p>Долго потому что стоит sleep 😅</p>
      </>
    );
  }
  return (
    <StoreProvider store={store} rootStore={store}>
      <Content />
    </StoreProvider>
  );
}
