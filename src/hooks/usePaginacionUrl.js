import { useCallback, useEffect, useState } from 'react';

export const OPCIONES_LIMITE = [10, 20, 40, 50];

function leerEnteroPositivo(valor, predeterminado) {
  if (!/^\d+$/.test(valor ?? '')) return predeterminado;
  const numero = Number(valor);
  return Number.isSafeInteger(numero) && numero > 0 ? numero : predeterminado;
}

export function leerFiltrosProductos() {
  const query = new URLSearchParams(window.location.search);
  const limite = leerEnteroPositivo(query.get('limit'), 10);
  return {
    pagina: leerEnteroPositivo(query.get('page'), 1),
    limite: OPCIONES_LIMITE.includes(limite) ? limite : 10,
    busqueda: query.get('q') ?? '',
    categoria: query.get('category') ?? '',
  };
}

// No se necesita React Router: el enlace se puede compartir y popstate
// recupera la página/los filtros al usar Atrás o Adelante en el navegador.
export default function usePaginacionUrl() {
  const [filtros, setFiltros] = useState(leerFiltrosProductos);

  useEffect(() => {
    const sincronizar = () => setFiltros(leerFiltrosProductos());
    window.addEventListener('popstate', sincronizar);
    return () => window.removeEventListener('popstate', sincronizar);
  }, []);

  const actualizarFiltros = useCallback((cambios, { reemplazar = false } = {}) => {
    const siguientes = { ...leerFiltrosProductos(), ...cambios };
    const url = new URL(window.location.href);
    url.searchParams.set('section', 'productos');
    url.searchParams.set('page', String(siguientes.pagina));
    url.searchParams.set('limit', String(siguientes.limite));

    if (siguientes.busqueda) url.searchParams.set('q', siguientes.busqueda);
    else url.searchParams.delete('q');

    if (siguientes.categoria) url.searchParams.set('category', siguientes.categoria);
    else url.searchParams.delete('category');

    if (url.href !== window.location.href) {
      window.history[reemplazar ? 'replaceState' : 'pushState']({}, '', url);
    }
    setFiltros(siguientes);
  }, []);

  return [filtros, actualizarFiltros];
}
