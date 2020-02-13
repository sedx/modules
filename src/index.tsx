import React from "react";
import { render } from "react-dom";

import "antd/dist/antd.css";

import App from "./App";
import { Layout } from "antd";

const rootElement = document.getElementById("root") as HTMLElement;
render(
  <Layout>
    <App />
  </Layout>,
  rootElement
);
