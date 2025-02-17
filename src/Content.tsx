import React from "react";
import { observer } from "mobx-react";

import Info from "./Info";

import "./styles.css";
import { RenderModule } from "core";
import UserInput from "UserInput";

const Content = () => {
  return (
    <div className="App">
      <Info />
      <UserInput />
      <RenderModule id="userDetails">Самый лучший пользователь</RenderModule>
      <RenderModule id="role" />
    </div>
  );
};

export default observer(Content);
