import "./index.css";

import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const isProduction = process.env.NODE_ENV === "production";
const basename = isProduction ? "/phil208-ethics-project" : "/";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
