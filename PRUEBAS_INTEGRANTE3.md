# Verificación del integrante 3 — Equipo 09

## Funcionalidad implementada

1. Inicia sesión usando `emilys` / `emilyspass`.
2. En el sidebar, abre **Productos (CRUD)** (sin modificar las secciones previas).
3. Comprueba que la tabla cargue con productos reales de la API de DummyJSON.
4. Cambia **Registros por página** entre 10, 20, 40 y 50, navega con los números y los botones de anterior/siguiente. Confirma que la URL actualiza `?section=productos&page=2&limit=20` (o valores equivalentes).
5. Presiona Atrás y Adelante en el navegador y comprueba que se recupera la página anterior.
6. Busca por título y selecciona categorías; comprueba el botón Limpiar filtros.
7. Agrega un producto mediante el modal y comprueba, en las herramientas de red del navegador, `POST /products/add` y la aparición del producto al principio de la tabla.
8. Edita un producto del catálogo original. Antes de guardar aparecerá una confirmación; comprueba `PUT /products/:id` y el cambio en la tabla.
9. Elimina un producto del catálogo original. Antes de eliminar aparece otra confirmación; comprueba `DELETE /products/:id` y que la fila desaparece.
10. Simula estar sin internet y comprueba que se vea el error de red. Al restaurar la conexión, usa Reintentar.
11. Opcional: comparte una URL con `page`, `limit`, `q`, `category` e inicia sesión de nuevo si el estado fue reiniciado.

## Verificar desde terminal

```bash
npm ci
npm test
npm run lint
npm run build
```

`npm test` prueba las peticiones GET/POST/PUT/DELETE y las respuestas erróneas con `fetch` simulado, sin conexión externa. Los otros comandos requieren las dependencias npm instaladas.

## Advertencias y justificación

- DummyJSON **no conserva** las escrituras. El estado local se modifica después de una respuesta HTTP satisfactoria. Si recargas la página o abandonas la vista, se recuperan los datos de la API.
- La API puede devolver el mismo ID para varios productos nuevos. Para que se puedan mostrar juntos se les asigna un ID negativo **solo dentro del estado local**.
- Un registro recién creado no existe en la base de DummyJSON; por eso posteriores ediciones o eliminaciones de ese registro son necesariamente locales y están etiquetadas en el sistema. En registros originales las llamadas PUT y DELETE sí son reales.
- Este ZIP no contiene `node_modules` ni el resultado compilado `dist`.
- El `README.md` tiene campos sin completar para los nombres del equipo y la IP del VPS. Sustitúyelos antes de entregar.
- **Atención:** el enunciado dice modalidad de **2 integrantes**, pero la división enviada incluye **3**. Confirmen con su profesora cuántos deben aparecer finalmente en el README.

## Trabajo colaborativo: subir solo el aporte del integrante 3

En el repositorio real de GitHub (no en un ZIP sin historial Git), crea una rama y lleva los archivos modificados de esta entrega.

```bash
git checkout -b feature/integrante3-paginacion-crud
git add src/components/ModalProducto.jsx src/components/Paginacion.jsx src/components/TablaProductos.jsx
git add src/hooks/usePaginacionUrl.js src/services/products.js src/pages/Productos.jsx
git add src/pages/Sistema.jsx src/components/sidebar.jsx package.json README.md tests/ PRUEBAS_INTEGRANTE3.md
git commit -m "feat: implementar paginación por URL y CRUD de productos con DummyJSON"
git push -u origin feature/integrante3-paginacion-crud
```

Después abre un Pull Request de esa rama hacia la rama principal del equipo. Haz el `npm run build` y el despliegue final en coordinación con el integrante que tiene acceso al VPS.
