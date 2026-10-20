import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',              // carpeta donde viven las pruebas
  fullyParallel: true,             // ejecuta pruebas en paralelo
  forbidOnly: !!process.env.CI,    // en CI falla si alguien dejó un test.only
  retries: process.env.CI ? 2 : 0, // reintentos solo en CI
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: 'http://localhost:3000', // permite escribir page.goto('/login.html')
    trace: 'retain-on-failure',       // guarda la "caja negra" de cada prueba fallida
    screenshot: 'only-on-failure',    // captura de pantalla al fallar
    video: 'retain-on-failure',       // video al fallar
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],

  // Levanta el sitio automáticamente antes de probar
  webServer: {
    command: 'node server.js',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
