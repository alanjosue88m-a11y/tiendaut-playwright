import { test, expect } from '@playwright/test';

test.describe('Inicio de sesión', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login.html');
  });

  test('con credenciales válidas entra al catálogo', async ({ page }) => {
    await page.getByLabel('Usuario').fill('alumno');
    await page.getByLabel('Contraseña').fill('utvm2026');
    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page).toHaveURL(/catalogo\.html/);
    await expect(page.getByRole('heading', { name: 'Catálogo' })).toBeVisible();
  });

  test('con contraseña incorrecta muestra un mensaje de error', async ({ page }) => {
    await page.getByLabel('Usuario').fill('alumno');
    await page.getByLabel('Contraseña').fill('equivocada');
    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page.getByRole('alert')).toHaveText('Usuario o contraseña incorrectos');
    await expect(page).toHaveURL(/login\.html/); // no debe avanzar
  });

  
test('iniciar sesión con los campos vacíos muestra un mensaje de error', async ({ page }) => {
  await page.goto('/login.html');

  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(page.getByRole('alert')).toBeVisible();

  await expect(page).toHaveURL(/login\.html/);
});

});
