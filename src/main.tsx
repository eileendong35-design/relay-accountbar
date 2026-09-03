import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AccountBar } from "./AccountBar";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const isAccountBar = new URLSearchParams(window.location.search).get("mode") === "account-bar";
  createRoot(rootElement).render(
    <React.StrictMode>
      {isAccountBar ? <AccountBar /> : <App />}
    </React.StrictMode>
  );
}
