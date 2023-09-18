import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Detail from "./detail/Detail";
import ErrorPage from "./components/ErrorPage/errorpage";

function getElement(id: string): HTMLElement | null {
  return document.getElementById(id);
}

const rootElement = getElement("root") || document.createElement("div");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/country/:ccn3",
    element: (
      <Detail
        match={{
          params: {
            ccn3: "",
          },
        }}
      />
    ),
  },
]);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
