import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  obtenerProductos,
  agregarProducto,
  editarProducto,
  eliminarProducto,
} from '../src/services/products.js';

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });

test('GET: solicita el catálogo completo y devuelve el arreglo', async () => {
  globalThis.fetch = async (url, opciones) => {
    assert.equal(url, 'https://dummyjson.com/products?limit=0');
    assert.ok(opciones);
    return new Response(JSON.stringify({ products: [{ id: 1, title: 'Producto' }] }), { status: 200 });
  };
  assert.deepEqual(await obtenerProductos(), [{ id: 1, title: 'Producto' }]);
});

test('POST: envía datos JSON a /products/add', async () => {
  const producto = { title: 'Mouse', price: 20, stock: 5, category: 'laptops' };
  globalThis.fetch = async (url, opciones) => {
    assert.equal(url, 'https://dummyjson.com/products/add');
    assert.equal(opciones.method, 'POST');
    assert.equal(opciones.headers['Content-Type'], 'application/json');
    assert.deepEqual(JSON.parse(opciones.body), producto);
    return new Response(JSON.stringify({ ...producto, id: 195 }), { status: 201 });
  };
  assert.equal((await agregarProducto(producto)).id, 195);
});

test('PUT: actualiza el ID solicitado', async () => {
  globalThis.fetch = async (url, opciones) => {
    assert.equal(url, 'https://dummyjson.com/products/9');
    assert.equal(opciones.method, 'PUT');
    assert.equal(JSON.parse(opciones.body).title, 'Nuevo nombre');
    return new Response(JSON.stringify({ id: 9, title: 'Nuevo nombre' }), { status: 200 });
  };
  assert.equal((await editarProducto(9, { title: 'Nuevo nombre' })).title, 'Nuevo nombre');
});

test('DELETE: usa la ruta del ID y no envía cuerpo', async () => {
  globalThis.fetch = async (url, opciones) => {
    assert.equal(url, 'https://dummyjson.com/products/4');
    assert.equal(opciones.method, 'DELETE');
    assert.equal(opciones.body, undefined);
    return new Response(JSON.stringify({ id: 4, isDeleted: true }), { status: 200 });
  };
  assert.equal((await eliminarProducto(4)).isDeleted, true);
});

test('Expone error legible cuando el servidor falla', async () => {
  globalThis.fetch = async () => new Response('{}', { status: 500 });
  await assert.rejects(() => editarProducto(1, { title: 'X' }), /No se pudo editar el producto \(HTTP 500\)/);
});

test('Rechaza un catálogo con formato inesperado', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ products: null }), { status: 200 });
  await assert.rejects(() => obtenerProductos(), /formato recibido/);
});
