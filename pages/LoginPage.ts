import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usuario: Locator;
  readonly password: Locator;
  readonly botonEntrar: Locator;
  readonly mensajeError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usuario = page.getByLabel('Usuario');
    this.password = page.getByLabel('Contraseña');
    this.botonEntrar = page.getByRole('button', { name: 'Entrar' });
    this.mensajeError = page.getByRole('alert');
  }

  async abrir() {
    await this.page.goto('/login.html');
  }

  async iniciarSesion(usuario: string, password: string) {
    await this.usuario.fill(usuario);
    await this.password.fill(password);
    await this.botonEntrar.click();
  }

  async esperarError(texto: string) {
    await expect(this.mensajeError).toHaveText(texto);
  }
}
