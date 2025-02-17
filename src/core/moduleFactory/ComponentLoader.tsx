import React, { useState, useEffect, ComponentType } from "react";

type Props = {
  id: string;
  component: () => Promise<ComponentType>;
};

export default function ComponentLoader({ component, id, ...props }: Props) {
  const [Component, setComponent] = useState<React.ComponentType | undefined>(
    undefined
  );

  useEffect(() => {
    if (Component) return;
    Promise.resolve(component()).then(c => {
      setComponent(() => c);
    });
  }, [component, Component]);

  if (Component) {
    return <Component {...props} />;
  }
  return <h1>Загружаем модуль {id}</h1>;
}
