import React, { useCallback, useMemo, useContext } from "react";
import { Button, Tooltip } from "antd";
import activeModules from "utils/activeModules";
import q from "qs";
import { StoreContext } from "core";

function ModuleBtn({ moduleName }: { moduleName: string }) {
  const roleLoaded = useMemo(() => activeModules.includes(moduleName), [
    moduleName
  ]);

  const toggleModule = useCallback(() => {
    const url = new URL(window.location.href);
    if (!roleLoaded) {
      const search = q.stringify({ m: [...activeModules, moduleName] });
      url.search = search;
      window.location.href = url.toString();
    } else {
      url.search = q.stringify({
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
  const { store }: any = useContext(StoreContext);

  return (
    <>
      <h1>Пример использования дианмичесикх модулей</h1>
      <p>
        Загруженные модули:&nbsp;
        <span style={{ fontSize: "20px", color: "#08c" }}>
          {Object.values(store.modules).map((m: any) => {
            console.log(m.moduleName, m.icon);
            return (
              <>
                <Tooltip key={m.moduleName} title={m.moduleName}>
                  {m.icon}
                </Tooltip>
                &nbsp;
              </>
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
