import fs from "node:fs";
import path from "node:path";
import express from "express";
import compression from "compression";
import { pathToFileURL } from "node:url";

const port = Number(process.env.PORT || 4177);
const root = process.cwd();

const distDir = path.join(root, "dist");
const indexHtmlPath = path.join(distDir, "index.html");
const assetsDir = path.join(distDir, "assets");
const entryServerPath = path.join(distDir, "client", "entry-server.js");

if (!fs.existsSync(indexHtmlPath)) {
  console.error("Missing:", indexHtmlPath);
  process.exit(1);
}
if (!fs.existsSync(entryServerPath)) {
  console.error("Missing:", entryServerPath);
  process.exit(1);
}

const template = fs.readFileSync(indexHtmlPath, "utf-8");

const app = express();
app.use(compression());

// Static assets (JS/CSS/images built by Vite)
if (fs.existsSync(assetsDir)) {
  app.use(
    "/assets",
    express.static(assetsDir, { maxAge: "1y", immutable: true })
  );
}

// Optional: serve public root files from dist (favicon, robots.txt, images)
app.use(express.static(distDir, { index: false, maxAge: "1h" }));

app.get("*", async (req, res) => {
  try {
    const mod = await import(pathToFileURL(entryServerPath).href);
    const { appHtml, head } = mod.render(req.originalUrl);

    const html = template
      .replace("<!--app-head-->", head || "")
      .replace("<!--app-html-->", appHtml || "");

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (err) {
    console.error("SSR error:", err);
    res.status(500).end("SSR Error");
  }
});

app.listen(port, () => console.log(`SSR running on :${port}`));
