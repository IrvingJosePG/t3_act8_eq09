# t3_act8_eq09 — Actividad 8: React + DummyJSON

Proyecto React/Vite del equipo **09**. El inicio de sesión y la interfaz NextVoto existentes se conservan; se agregó una sección **Productos (CRUD)** para cubrir la tabla de una API permitida en la actividad.

## Integrantes

- Integrante 1: **Perez Gris Irving Jose** — login y despliegue.
- Integrante 2: **Fernández López Jazmín** — sidebar, navbar y vistas iniciales.
- Integrante 3: **Sandoval Reyes Miguel** — paginación, URL y CRUD.

## APIs

- Autenticación: `POST https://dummyjson.com/auth/login`
- Tabla de productos: `GET https://dummyjson.com/products?limit=0`
- Alta: `POST https://dummyjson.com/products/add`
- Edición: `PUT https://dummyjson.com/products/:id`
- Borrado: `DELETE https://dummyjson.com/products/:id`
- Las secciones previas de cuestionarios y alumnos usan los endpoints de demostración `/todos` y `/users`.

Cuenta de prueba del login: **emilys** / **emilyspass**.

**URL del VPS:** `http://167.99.15.140/t3_act8_eq09/`

## Organización del código

- `src/services/products.js`: GET, POST, PUT, DELETE de productos.
- `src/hooks/usePaginacionUrl.js`: parámetros de filtros y página sincronizados con `history`/`popstate`.
- `src/pages/Productos.jsx`: carga, filtros y estado local después de operaciones.
- `src/components/TablaProductos.jsx`: tabla y acciones.
- `src/components/ModalProducto.jsx`: formulario y validaciones.
- `src/components/Paginacion.jsx`: controles de navegación y cantidad de filas.

No se suben `node_modules/` ni `dist/`; ambas carpetas están en `.gitignore`.
