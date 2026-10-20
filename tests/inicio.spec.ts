import { test, expect } from '@playwright/test';

test('la página de inicio muestra el título y el encabezado', async ({ page }) => {
  // 1. Arrange (preparar): ir a la página
  await page.goto('/');

  // 2. Assert (verificar): título de la pestaña y encabezado principal
  await expect(page).toHaveTitle('TiendaUT');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bienvenido a TiendaUT');
});

test('el enlace "Iniciar sesión" lleva al formulario', async ({ page }) => {
  await page.goto('/');

  // 3. Act (actuar): hacer clic en el enlace
  await page.getByRole('link', { name: 'Iniciar sesión' }).click();

  await expect(page).toHaveURL(/login\.html/);
  await expect(page.getByRole('heading', { name: 'Iniciar sesión' })).toBeVisible();
});
