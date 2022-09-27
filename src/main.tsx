import React from "react";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { store } from "./contexts/redux/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
