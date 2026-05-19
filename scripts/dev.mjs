import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { stat, readFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { build } from "vite";

const host = "127.0.0.1";
const port = Number(process.env.PORT ?? 5173);
const root = process.cwd();
const dist = resolve(root, "dist");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8"
};

function safePath(pathname) {
  const cleanPath = decodeURIComponent(pathname.split("?")[0]).replace(/^\/+/, "");
  const target = resolve(dist, cleanPath);
  return target.startsWith(dist) ? target : join(dist, "index.html");
}

async function findFile(pathname) {
  const target = safePath(pathname === "/" ? "/index.html" : pathname);
  if (existsSync(target) && (await stat(target)).isFile()) return target;
  return join(dist, "index.html");
}

console.log("Building local prototype...");
await build({ root, logLevel: "warn" });

const server = createServer(async (request, response) => {
  try {
    const filePath = await findFile(request.url ?? "/");
    const extension = extname(filePath);
    response.setHeader("Content-Type", mimeTypes[extension] ?? "application/octet-stream");
    response.setHeader("Cache-Control", "no-store");

    if (request.method === "HEAD") {
      response.statusCode = 200;
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
  } catch {
    response.statusCode = 500;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end("Local prototype server error.");
  }
});

server.listen(port, host, async () => {
  const html = await readFile(join(dist, "index.html"), "utf8");
  if (!html.includes("/assets/")) {
    console.warn("Built index did not include asset references.");
  }
  console.log(`Local: http://${host}:${port}/`);
  console.log("Press Ctrl+C to stop the local prototype server.");
});
