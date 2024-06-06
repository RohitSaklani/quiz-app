import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "@radix-ui/themes/styles.css";
import "./index.css";
import { LoaderContextProvider } from "./context/LoaderContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoaderContextProvider>
      {" "}
      <App />
    </LoaderContextProvider>
  </React.StrictMode>
);
