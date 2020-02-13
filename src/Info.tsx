import React, { useCallback, useMemo } from "react";
import { Button } from "antd";
import activeModules from "utils/activeModules";
import q from "qs";

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
  return (
    <>
      <h1>Пример использования дианмичесикх модулей</h1>
      <div>
        <ModuleBtn moduleName="Role" />
        <ModuleBtn moduleName="Avatar" />
      </div>
    </>
  );
};

export default Info;
