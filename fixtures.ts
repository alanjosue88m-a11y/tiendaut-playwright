import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

// Extendemos "test" con un fixture propio: loginPage
export const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.abrir();   // preparación
    await use(login);      // aquí corre la prueba
  },
});

export { expect } from '@playwright/test';
