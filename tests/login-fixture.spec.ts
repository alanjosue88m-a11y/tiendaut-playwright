import { test, expect } from '../fixtures';

test('login correcto usando el fixture loginPage', async ({ loginPage, page }) => {
  await loginPage.iniciarSesion('alumno', 'utvm2026');
  await expect(page).toHaveURL(/catalogo\.html/);
});
