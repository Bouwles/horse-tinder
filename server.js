// Zero-dependency static server: `npm start` (or `node server.js`), then open the printed URL.
const http = require('http'), fs = require('fs'), path = require('path'), { exec } = require('child_process');
const PORT = process.env.PORT || 5173, ROOT = __dirname;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.md': 'text/plain' };
http.createServer((req, res) => {
  const file = path.join(ROOT, path.normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, ''));
  const target = file.endsWith(path.sep) || req.url === '/' ? path.join(ROOT, 'index.html') : file;
  if (!target.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(target, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(target)] || 'application/octet-stream' }); res.end(data);
  });
}).listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`🐴 Horse Tinder is running at ${url}`);
  const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start ""' : 'xdg-open';
  exec(`${cmd} ${url}`, () => {});
});
