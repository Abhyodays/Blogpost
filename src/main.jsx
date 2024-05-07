import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./index.css";
import { LikeProvider } from "./contexts/LikeContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <LikeProvider>
        <App />
      </LikeProvider>
    </Provider>
  </React.StrictMode>
);
