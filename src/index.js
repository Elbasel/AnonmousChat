import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Parse from "parse";

Parse.initialize(
  "2JbJXUS3TCcnQ7WO7wbROMUEc64qCkrpjG8W6Q7w",
  "UciG0lunmmSEJzIyuhLDn6Jl67uGsp8pDCpkyDhr"
);
Parse.serverURL = "https://parseapi.back4app.com/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
