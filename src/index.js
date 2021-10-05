import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UseStaysProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <UseStaysProvider>
      <App />
    </UseStaysProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
