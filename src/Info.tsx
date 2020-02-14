import React, { useCallback, useMemo, useContext } from "react";
import { Button, Tooltip } from "antd";
import activeModules from "utils/activeModules";
import q from "qs";
import { useStore } from "core";

function ModuleBtn({ moduleName }: { moduleName: string }) {
  const roleLoaded = useMemo(() => activeModules.includes(moduleName), [
    moduleName
  ]);

  const toggleModule = useCallback(() => {
    const url = new URL(window.location.href);
    const params = q.parse(window.location.href, { ignoreQueryPrefix: true });
    if (!roleLoaded) {
      const search = q.stringify({
        ...params,
        m: [...activeModules, moduleName]
      });
      url.search = search;
      window.location.href = url.toString();
    } else {
      url.search = q.stringify({
        ...params,
        m: activeModules.filter(m => m !== moduleName)
      });
      window.location.href = url.toString();
    }
  }, [roleLoaded, moduleName]);

  return (
    <p>
      <Button type={roleLoaded ? "primary" : "default"} onClick={toggleModule}>
        {roleLoaded
          ? `Не использовать модуль ${moduleName}`
          : `Использовать модуль ${moduleName}`}
      </Button>
    </p>
  );
}

const Info = () => {
  const { store } = useStore();

  return (
    <>
      <h1>Пример использования дианмичесикх модулей</h1>
      <p>
        Загруженные модули:&nbsp;
        <span style={{ fontSize: "20px", color: "#08c" }}>
          {Object.values(store.modules).map((m: any) => {
            return (
              <React.Fragment key={m.id}>
                <Tooltip title={m.id}>
                  <span dangerouslySetInnerHTML={{ __html: m.icon }} />
                </Tooltip>
                &nbsp;
              </React.Fragment>
            );
          })}
        </span>
      </p>
      <div>
        <ModuleBtn moduleName="Role" />
        <ModuleBtn moduleName="Avatar" />
      </div>
    </>
  );
};

export default Info;
