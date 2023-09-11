import React from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import { routers } from "./routes";

const App = () => {
  return (
    <div className="app">
      <>{useRoutes(routers)}</>
    </div>
  );
};

export default App;
