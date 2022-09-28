import React from "react";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { store } from "./contexts/redux/store";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./index.css";
import { AppProvider } from "./contexts/AppContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        <Router>
          <App />
        </Router>
      </AppProvider>
    </Provider>
  </React.StrictMode>
);
