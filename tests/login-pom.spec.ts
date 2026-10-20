import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login correcto usando Page Object', async ({ page }) => {
  const login = new LoginPage(page);
  await login.abrir();
  await login.iniciarSesion('alumno', 'utvm2026');
  await expect(page).toHaveURL(/catalogo\.html/);
});

test('login incorrecto usando Page Object', async ({ page }) => {
  const login = new LoginPage(page);
  await login.abrir();
  await login.iniciarSesion('alumno', 'otra');
  await login.esperarError('Usuario o contraseña incorrectos');
});
