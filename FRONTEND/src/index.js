import * as React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Sidebar } from "./components/Sidebar";
import RoleForm from "./pages/roles/RoleForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
