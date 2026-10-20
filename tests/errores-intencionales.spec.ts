import { test, expect } from '@playwright/test';

// Pruebas que FALLAN A PROPÓSITO para estudiar los mensajes de error.
// Ejecútalas con:  npm run test:laboratorio

test.describe('Laboratorio de errores @laboratorio', () => {
  test('E1 - el elemento no existe (timeout)', async ({ page }) => {
    test.setTimeout(8000);
    await page.goto('/catalogo.html');
    await page.getByRole('button', { name: 'Comprar ahora' }).click();
  });

  test('E2 - el locator encuentra varios elementos (strict mode)', async ({ page }) => {
    await page.goto('/catalogo.html');
    await expect(page.getByTestId('producto')).toHaveCount(4);
    await page.getByRole('button', { name: 'Agregar al carrito' }).click();
  });

  test('E3 - el texto no coincide (Expected vs Received)', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bienvenidos a TiendaUT');
  });

  test('E4 - la URL no es la esperada', async ({ page }) => {
    await page.goto('/login.html');
    await page.getByLabel('Usuario').fill('alumno');
    await page.getByLabel('Contraseña').fill('mal');
    await page.getByRole('button', { name: 'Entrar' }).click();
    await expect(page).toHaveURL(/catalogo\.html/);
  });

  test('E5 - el servidor no está levantado', async ({ page }) => {
    await page.goto('http://localhost:3999/');
  });

  test('E6 - el sitio lanza un error de JavaScript', async ({ page }) => {
    const errores: string[] = [];
    page.on('pageerror', (error) => errores.push(error.message));

    await page.goto('/catalogo.html');
    await page.getByRole('button', { name: 'Vaciar carrito' }).click();

    expect(errores).toEqual([]);
  });

  test('E7 - olvidé el await', async ({ page }) => {
    await page.goto('/');
    expect(page.getByRole('heading', { name: 'No existe' })).toBeVisible(); // sin await
  });

  test('E8 - getByLabel sobre un campo sin etiqueta', async ({ page }) => {
    test.setTimeout(8000);
    await page.goto('/catalogo.html');
    await page.getByLabel('Buscar producto').fill('mouse');
  });
});
