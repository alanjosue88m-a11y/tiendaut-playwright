import { test, expect } from '@playwright/test';

test('la API devuelve los 4 productos', async ({ request }) => {
  const respuesta = await request.get('/api/productos');
  expect(respuesta.ok()).toBeTruthy();

  const productos = await respuesta.json();
  expect(productos).toHaveLength(4);
  expect(productos[0]).toHaveProperty('precio');
});
