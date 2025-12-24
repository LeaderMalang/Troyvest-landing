import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import pkg from 'react-helmet-async';
const { Helmet, HelmetProvider } = pkg;
import { AppShell, AppRoutes } from "./App";
import "./index.css";

hydrateRoot(
  document.getElementById("root")!,
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
