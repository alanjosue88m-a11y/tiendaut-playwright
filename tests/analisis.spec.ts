import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Análisis de calidad del catálogo', () => {

  test('no hay errores en la consola del navegador', async ({ page }) => {
    const mensajes: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') mensajes.push(msg.text());
    });
    page.on('pageerror', (err) => mensajes.push(err.message));

    await page.goto('/catalogo.html');
    await expect(page.getByTestId('producto')).toHaveCount(4);

    expect(mensajes, 'Errores encontrados en consola').toEqual([]);
  });

  test('ninguna petición de red responde con error', async ({ page }) => {
    const fallidas: string[] = [];
    page.on('response', (res) => {
      if (res.status() >= 400) fallidas.push(`${res.status()} ${res.url()}`);
    });

    await page.goto('/catalogo.html');
    await expect(page.getByTestId('producto')).toHaveCount(4);

    expect(fallidas).toEqual([]);
  });

  test('la página no tiene violaciones de accesibilidad', async ({ page }) => {
    await page.goto('/catalogo.html');
    await expect(page.getByTestId('producto')).toHaveCount(4);

    const resultados = await new AxeBuilder({ page }).analyze();
    const resumen = resultados.violations.map(v => `${v.id}: ${v.help} (${v.nodes.length})`);

    expect(resumen).toEqual([]);
  });
});
