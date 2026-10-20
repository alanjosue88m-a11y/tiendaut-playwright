// Servidor mínimo (sin dependencias) para el sitio de práctica "TiendaUT"
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');

const productos = [
  { id: 1, nombre: 'Teclado mecánico', precio: 899 },
  { id: 2, nombre: 'Mouse inalámbrico', precio: 349 },
  { id: 3, nombre: 'Monitor 24 pulgadas', precio: 2799 },
  { id: 4, nombre: 'Audífonos USB', precio: 459 },
];

const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };

http.createServer((req, res) => {
  if (req.url === '/api/productos') {
    // Simula una API lenta (800 ms) para demostrar la espera automática
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(productos));
    }, 800);
    return;
  }
  const archivo = path.join(PUBLIC, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  fs.readFile(archivo, (err, data) => {
    if (err) { res.writeHead(404); return res.end('No encontrado'); }
    res.writeHead(200, { 'Content-Type': tipos[path.extname(archivo)] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`TiendaUT en http://localhost:${PORT}`));
