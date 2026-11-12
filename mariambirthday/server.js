const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const publicDirectory = path.join(__dirname, "public");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webm": "video/webm",
  ".webp": "image/webp",
};

const server = http.createServer((request, response) => {
  const requestPath = new URL(request.url, "http://localhost").pathname;
  const relativePath = requestPath === "/" ? "index.html" : requestPath.slice(1);
  const filePath = path.resolve(publicDirectory, relativePath);

  if (!filePath.startsWith(`${publicDirectory}${path.sep}`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const headers = {
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-cache",
      "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    };
    const rangeHeader = request.headers.range;

    if (rangeHeader) {
      const range = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
      if (!range || (!range[1] && !range[2]) || stats.size === 0) {
        response.writeHead(416, { ...headers, "Content-Range": `bytes */${stats.size}` });
        response.end();
        return;
      }

      const requestedStart = range[1] ? Number(range[1]) : null;
      const requestedEnd = range[2] ? Number(range[2]) : null;
      const start = requestedStart === null
        ? Math.max(stats.size - requestedEnd, 0)
        : requestedStart;
      const end = requestedStart === null || requestedEnd === null
        ? stats.size - 1
        : Math.min(requestedEnd, stats.size - 1);

      if (
        !Number.isSafeInteger(start) ||
        !Number.isSafeInteger(end) ||
        start >= stats.size ||
        start > end
      ) {
        response.writeHead(416, { ...headers, "Content-Range": `bytes */${stats.size}` });
        response.end();
        return;
      }

      response.writeHead(206, {
        ...headers,
        "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${stats.size}`,
      });
      if (request.method === "HEAD") {
        response.end();
        return;
      }
      fs.createReadStream(filePath, { start, end }).pipe(response);
      return;
    }

    response.writeHead(200, { ...headers, "Content-Length": stats.size });
    if (request.method === "HEAD") {
      response.end();
      return;
    }
    fs.createReadStream(filePath).pipe(response);
  });
});

const port = Number(process.env.PORT) || 3000;
server.listen(port, () => {
  console.log(`Birthday memories website running at http://localhost:${port}`);
});
