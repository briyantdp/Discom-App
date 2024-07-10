import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";

import App from "./App.jsx";

import stores from "./states";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={stores}>
    <BrowserRouter>
      <React.StrictMode>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
