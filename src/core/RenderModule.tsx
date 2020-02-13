import React, { useRef, useMemo, useContext } from "react";
import { observer } from "mobx-react";

import { StoreContext } from "./moduleFactory/StoreContext";

type Props = {
  moduleName: string;
  style?: React.CSSProperties;
  container?: React.ElementType;
};

const RenderModule: React.FC<Props> = ({
  moduleName,
  style,
  container: Container = "div",
  ...props
}) => {
  const { rootStore }: any = useContext(StoreContext);

  const element = useRef(null);
  const render = useMemo(() => {
    try {
      return rootStore.modules[moduleName].render;
    } catch (e) {
      return null;
    }
  }, [rootStore, moduleName]);

  React.useEffect(() => {
    render && render(element.current, rootStore, props);
  }, []);

  if (!render) {
    return null;
  }

  return (
    <fieldset style={style}>
      <legend>Это модуль {moduleName}</legend>
      <Container ref={element} />
    </fieldset>
  );
};

export default observer(RenderModule);
