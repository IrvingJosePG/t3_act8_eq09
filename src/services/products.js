// Las escrituras de DummyJSON son simuladas: responde a POST/PUT/DELETE,
// pero no conserva los cambios. La vista debe actualizar su estado local.
const API_PRODUCTOS = 'https://dummyjson.com/products';

async function solicitarProducto(url, opciones = {}, mensaje = 'No se pudo completar la operación') {
  let respuesta;

  try {
    respuesta = await fetch(url, opciones);
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error('No se pudo conectar con DummyJSON. Revisa tu conexión a internet.');
  }

  if (!respuesta.ok) {
    throw new Error(`${mensaje} (HTTP ${respuesta.status}).`);
  }

  try {
    return await respuesta.json();
  } catch {
    throw new Error('La API devolvió una respuesta que no se pudo leer.');
  }
}

const opcionesJSON = (metodo, producto) => ({
  method: metodo,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(producto),
});

export async function obtenerProductos(signal) {
  // limit=0 permite filtrar/paginar sobre todo el catálogo también
  // después de POST, PUT y DELETE simulados.
  const datos = await solicitarProducto(
    `${API_PRODUCTOS}?limit=0`,
    { signal },
    'No se pudieron cargar los productos',
  );

  if (!Array.isArray(datos.products)) {
    throw new Error('El formato recibido de la API no es válido.');
  }

  return datos.products;
}

export function agregarProducto(producto) {
  return solicitarProducto(
    `${API_PRODUCTOS}/add`,
    opcionesJSON('POST', producto),
    'No se pudo agregar el producto',
  );
}

export function editarProducto(id, producto) {
  return solicitarProducto(
    `${API_PRODUCTOS}/${encodeURIComponent(id)}`,
    opcionesJSON('PUT', producto),
    'No se pudo editar el producto',
  );
}

export function eliminarProducto(id) {
  return solicitarProducto(
    `${API_PRODUCTOS}/${encodeURIComponent(id)}`,
    { method: 'DELETE' },
    'No se pudo eliminar el producto',
  );
}
