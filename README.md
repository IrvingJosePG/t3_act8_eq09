# t3_act8_eq09 — Actividad 8: React + DummyJSON

Proyecto React/Vite del equipo **09**. El inicio de sesión y la interfaz NextVoto existentes se conservan; se agregó una sección **Productos (CRUD)** para cubrir la tabla de una API permitida en la actividad.

## Integrantes

- Integrante 1: **[Completar con nombre real]** — login y despliegue.
- Integrante 2: **[Completar con nombre real]** — sidebar, navbar y vistas iniciales.
- Integrante 3: **[Completar con nombre real]** — paginación, URL y CRUD.

## APIs

- Autenticación: `POST https://dummyjson.com/auth/login`
- Tabla de productos: `GET https://dummyjson.com/products?limit=0`
- Alta: `POST https://dummyjson.com/products/add`
- Edición: `PUT https://dummyjson.com/products/:id`
- Borrado: `DELETE https://dummyjson.com/products/:id`
- Las secciones previas de cuestionarios y alumnos usan los endpoints de demostración `/todos` y `/users`.

Cuenta de prueba del login: **emilys** / **emilyspass**.

### Lo implementado por el integrante 3

- Sección **Productos (CRUD)** en el sidebar.
- Filtro por título y categoría.
- Paginación de 10, 20, 40 o 50 filas, con página y límite en URL. También se reflejan `section`, `q` y `category` para compartir filtros. El navegador puede regresar o avanzar entre páginas.
- Formulario para agregar y editar con validación; confirmación antes de editar y eliminar.
- Peticiones reales a DummyJSON y actualización inmediata de `useState` **después** de la respuesta satisfactoria.
- Indicadores de carga, fallos de red y mensajes de éxito/error.

**Límite de DummyJSON:** POST/PUT/DELETE solo **simulan** guardar los cambios; al actualizar la página o salir de Productos se pierden. Los registros agregados por POST usan IDs locales negativos únicos porque el servidor devuelve el mismo ID simulado al dar de alta varias veces. Como esos nuevos IDs no existen en el servidor, *editar o borrar un registro recién creado se maneja solo localmente y se informa en pantalla*; las operaciones PUT/DELETE reales se ejecutan sobre registros del catálogo original.

## Ejecutar en desarrollo

```bash
npm ci
npm run dev
```

Para ejecutar las pruebas del servicio sin conexión a la API: `npm test`.


Abre la URL local de Vite, inicia sesión y navega a **Productos (CRUD)**.

## Compilar y publicar en VPS

El archivo `vite.config.js` ya configura `base: '/t3_act8_eq09/'`.

```bash
npm run build
```

Sube **el contenido** de `dist/` a la carpeta de Nginx configurada para `/t3_act8_eq09/`. Si Nginx utiliza el directorio `/var/www/html`, el destino habitual es `/var/www/html/t3_act8_eq09/` (comprueba antes la configuración de tu VPS). Para que los parámetros `?page=2&limit=20` funcionen no necesitas un router de servidor: se consumen directamente en la página React.

**URL del VPS:** `http://IP_DE_SU_VPS/t3_act8_eq09/` (sustituir por la IP real).

## Organización del código

- `src/services/products.js`: GET, POST, PUT, DELETE de productos.
- `src/hooks/usePaginacionUrl.js`: parámetros de filtros y página sincronizados con `history`/`popstate`.
- `src/pages/Productos.jsx`: carga, filtros y estado local después de operaciones.
- `src/components/TablaProductos.jsx`: tabla y acciones.
- `src/components/ModalProducto.jsx`: formulario y validaciones.
- `src/components/Paginacion.jsx`: controles de navegación y cantidad de filas.

No se suben `node_modules/` ni `dist/`; ambas carpetas están en `.gitignore`.
