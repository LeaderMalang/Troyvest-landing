import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { HelmetProvider } from "react-helmet-async";
import { AppShell, AppRoutes } from "./App";

export async function render(url: string, initialData: any) {
  const helmetContext: any = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  const head = [
    helmet?.title?.toString?.() || "",
    helmet?.meta?.toString?.() || "",
    helmet?.link?.toString?.() || "",
    helmet?.script?.toString?.() || "",
  ].join("\n");

  return { appHtml, head };
}
