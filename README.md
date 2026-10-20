# TiendaUT · Práctica de pruebas E2E con Playwright

Sitio de práctica para la Unidad II de **Gestión del Proceso de Desarrollo de Software**.
El sitio **tiene errores a propósito**: su trabajo es encontrarlos con Playwright, analizarlos y corregirlos.

## 1. Instalar

```bash
npm install
npx playwright install     # solo si aún no tienen los navegadores
```

## 2. Ejecutar

| Comando | Qué hace |
|---|---|
| `npm start` | Levanta el sitio en http://localhost:3000 (no es necesario para las pruebas: Playwright lo levanta solo) |
| `npm test` | Corre toda la suite en Chromium, Firefox y WebKit |
| `npm run test:chromium` | Corre la suite solo en Chromium (más rápido) |
| `npm run test:ui` | Abre el modo UI (recomendado para analizar) |
| `npm run test:laboratorio` | Corre las 8 pruebas que fallan a propósito (E1–E8) |
| `npm run report` | Abre el reporte HTML de la última ejecución |
| `npm run lint` | Análisis estático de las pruebas con ESLint + eslint-plugin-playwright |

## 3. Usuarios de prueba

- Usuario: `alumno`
- Contraseña: `utvm2026`

## 4. Estructura

```
server.js                 servidor del sitio (sin dependencias)
public/                   páginas del sitio (index, login, catálogo)
pages/LoginPage.ts        ejemplo de Page Object Model
tests/                    pruebas de Playwright
playwright.config.ts      configuración
```

## 5. Integración continua

`.github/workflows/playwright.yml` ejecuta ESLint (sin el laboratorio de errores) y `npm test` en cada push y pull request, y publica el
reporte HTML como artefacto. Mientras el sitio tenga sus defectos, el pipeline estará **en rojo**: es normal.

## 6. Nota sobre la prueba visual

La primera vez que corran `red-y-visual.spec.ts`, la prueba de captura **fallará a propósito** y
guardará la imagen de referencia en `tests/red-y-visual.spec.ts-snapshots/`. Desde la segunda ejecución compara contra ella.
Las referencias dependen del sistema operativo (`-win32`, `-darwin`, `-linux`); en GitHub Actions se usa
`--update-snapshots=missing` para que la primera ejecución en Linux cree su propia referencia sin fallar.
