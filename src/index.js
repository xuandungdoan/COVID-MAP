import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "./sass/main.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";
import { ConfigStore } from "../src/store";

require("leaflet/dist/leaflet.css"); // inside .js file
require("react-leaflet-markercluster/dist/styles.min.css");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ConfigStore()}>
      {" "}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
