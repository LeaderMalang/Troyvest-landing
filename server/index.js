import fs from "node:fs";
import path from "node:path";
import express from "express";
import compression from "compression";
import { pathToFileURL } from "node:url";

const port = Number(process.env.PORT || 4177);
const root = process.cwd();

const clientDir = path.join(root, "dist", "client");
const serverEntry = path.join(root, "dist", "server", "entry-server.js");

const indexHtmlPath = path.join(clientDir, "index.html");
const assetsDir = path.join(clientDir, "assets");

if (!fs.existsSync(indexHtmlPath)) {
  console.error("Missing:", indexHtmlPath);
  process.exit(1);
}
if (!fs.existsSync(serverEntry)) {
  console.error("Missing:", serverEntry);
  process.exit(1);
}

const template = fs.readFileSync(indexHtmlPath, "utf-8");

const app = express();
app.use(compression());

// Serve built assets
app.use("/assets", express.static(assetsDir, { maxAge: "1y", immutable: true }));
app.use(express.static(clientDir, { index: false, maxAge: "1h" }));

app.get("*", async (req, res) => {
  try {
    const mod = await import(pathToFileURL(serverEntry).href);
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
