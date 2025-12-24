import fs from "node:fs";
import path from "node:path";
import express from "express";
import compression from "compression";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT || 4177);

const app = express();
app.use(compression());

// Paths
const root = process.cwd();
const distClient = path.join(root, "dist/client");

// Load HTML template
const template = fs.readFileSync(
  path.join(distClient, "index.html"),
  "utf-8"
);

// Serve static assets
app.use(
  "/assets",
  express.static(path.join(distClient, "assets"), {
    maxAge: "1y",
    immutable: true,
  })
);

// SSR handler
app.get("*", async (req, res) => {
  try {
    const url = req.originalUrl;

    // Load SSR render function
    const ssrModule = await import(
      pathToFileURL(path.join(distClient, "entry-server.js")).href
    );

    const { appHtml, head } = ssrModule.render(url);

    const html = template
      .replace("<!--app-head-->", head)
      .replace("<!--app-html-->", appHtml);

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (err) {
    console.error("SSR error:", err);
    res.status(500).end("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`SSR server running on http://localhost:${port}`);
});
