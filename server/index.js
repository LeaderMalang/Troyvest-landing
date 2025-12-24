import fs from "node:fs";
import path from "node:path";
import express from "express";
import compression from "compression";
import { pathToFileURL } from "node:url";

const port = Number(process.env.PORT || 4177);
const root = process.cwd();

// Detect dist layout:
// - preferred: dist/client/index.html
// - fallback: dist/index.html
const distClientA = path.join(root, "dist", "client");
const distClientB = path.join(root, "dist");

const hasA = fs.existsSync(path.join(distClientA, "index.html"));
const clientDir = hasA ? distClientA : distClientB;

const indexPath = path.join(clientDir, "index.html");
if (!fs.existsSync(indexPath)) {
  console.error("index.html not found at:", indexPath);
  console.error("Directory listing dist:", fs.existsSync(path.join(root, "dist")) ? fs.readdirSync(path.join(root, "dist")) : "NO dist/");
  process.exit(1);
}

const template = fs.readFileSync(indexPath, "utf-8");

appSetup();

function appSetup() {
  const app = express();
  app.use(compression());

  // serve assets (works in both layouts)
  const assetsDir = path.join(clientDir, "assets");
  if (fs.existsSync(assetsDir)) {
    app.use(
      "/assets",
      express.static(assetsDir, { maxAge: "1y", immutable: true })
    );
  }

  // SSR render bundle location (in your build log it is: dist/client/entry-server.js)
  const entryServerPathA = path.join(distClientA, "entry-server.js");
  const entryServerPathB = path.join(distClientB, "entry-server.js");
  const entryServer = fs.existsSync(entryServerPathA)
    ? entryServerPathA
    : entryServerPathB;

  if (!fs.existsSync(entryServer)) {
    console.error("entry-server.js not found at:", entryServer);
    process.exit(1);
  }

  app.get("*", async (req, res) => {
    try {
      const mod = await import(pathToFileURL(entryServer).href);
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
}
