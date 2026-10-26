import { useEffect, useMemo, useState } from 'react';
import { FilterX, PackagePlus, RefreshCw, Search } from 'lucide-react';
import { agregarProducto, editarProducto, eliminarProducto, obtenerProductos } from '../services/products';
import usePaginacionUrl from '../hooks/usePaginacionUrl';
import ModalProducto from '../components/ModalProducto';
import TablaProductos from '../components/TablaProductos';
import Paginacion from '../components/Paginacion';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState('');
  const [errorAccion, setErrorAccion] = useState('');
  const [aviso, setAviso] = useState('');
  const [reintentos, setReintentos] = useState(0);
  const [modal, setModal] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [procesandoId, setProcesandoId] = useState(null);
  const [{ pagina, limite, busqueda, categoria }, actualizarFiltros] = usePaginacionUrl();

  useEffect(() => {
    const controlador = new AbortController();
    async function cargarProductos() {
      setCargando(true);
      setErrorCarga('');
      try {
        const datos = await obtenerProductos(controlador.signal);
        if (!controlador.signal.aborted) setProductos(datos);
      } catch (error) {
        if (!controlador.signal.aborted) setErrorCarga(error.message);
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }
    cargarProductos();
    return () => controlador.abort();
  }, [reintentos]);

  const categorias = useMemo(
    () => [...new Set(productos.map((p) => p.category).filter(Boolean))].sort(),
    [productos],
  );

  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase('es');
    return productos.filter((p) =>
      p.title.toLocaleLowerCase('es').includes(texto) && (!categoria || p.category === categoria),
    );
  }, [productos, busqueda, categoria]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / limite));
  const paginaActual = Math.min(pagina, totalPaginas);
  const productosPagina = filtrados.slice((paginaActual - 1) * limite, paginaActual * limite);

  useEffect(() => {
    if (!cargando && !errorCarga && pagina !== paginaActual) {
      actualizarFiltros({ pagina: paginaActual }, { reemplazar: true });
    }
  }, [cargando, errorCarga, pagina, paginaActual, actualizarFiltros]);

  const limpiarMensajes = () => { setErrorAccion(''); setAviso(''); };

  function abrirNuevo() {
    limpiarMensajes();
    setModal({ tipo: 'crear', producto: null });
  }

  function abrirEdicion(producto) {
    limpiarMensajes();
    setModal({ tipo: 'editar', producto });
  }

  async function guardarProducto(datos) {
    if (!modal || guardando) return;
    const { tipo, producto } = modal;
    if (tipo === 'editar' && !window.confirm(`¿Confirmas que deseas guardar los cambios de "${producto.title}"?`)) return;

    setGuardando(true);
    limpiarMensajes();
    try {
      if (tipo === 'crear') {
        const respuesta = await agregarProducto(datos);
        // DummyJSON devuelve el mismo ID simulado en cada POST. Un ID local
        // negativo evita colisiones y no se confunde con uno del servidor.
        setProductos((anteriores) => {
          const siguienteId = Math.min(0, ...anteriores.map((p) => p.id)) - 1;
          return [{ ...respuesta, ...datos, id: siguienteId, _soloLocal: true }, ...anteriores];
        });
        actualizarFiltros({ pagina: 1, busqueda: '', categoria: '' });
        setAviso(`POST exitoso (la API devolvió ID ${respuesta.id}). El producto aparece en la tabla durante esta sesión.`);
      } else if (producto._soloLocal) {
        // Al no persistir el POST, la API no admite PUT sobre el nuevo ID.
        setProductos((anteriores) => anteriores.map((p) => p.id === producto.id ? { ...p, ...datos } : p));
        setAviso('Producto nuevo modificado en el estado local (DummyJSON no conserva productos creados).');
      } else {
        const respuesta = await editarProducto(producto.id, datos);
        setProductos((anteriores) => anteriores.map((p) => p.id === producto.id ? { ...p, ...respuesta, ...datos } : p));
        setAviso(`PUT exitoso para el producto ${respuesta.id}. Los cambios ya aparecen en la tabla.`);
      }
      setModal(null);
    } catch (error) {
      setErrorAccion(error.message);
    } finally {
      setGuardando(false);
    }
  }

  async function borrarProducto(producto) {
    if (!window.confirm(`¿Seguro que deseas eliminar "${producto.title}"? Esta acción se reflejará en la tabla.`)) return;

    limpiarMensajes();
    setProcesandoId(producto.id);
    try {
      if (!producto._soloLocal) {
        const respuesta = await eliminarProducto(producto.id);
        if (!respuesta.isDeleted) throw new Error('La API no confirmó la eliminación del registro.');
        setAviso(`DELETE exitoso para el producto ${producto.id}. Producto retirado de la tabla.`);
      } else {
        setAviso('Producto creado en esta sesión: eliminación local (DummyJSON no conserva las altas).');
      }
      setProductos((anteriores) => anteriores.filter((p) => p.id !== producto.id));
    } catch (error) {
      setErrorAccion(error.message);
    } finally {
      setProcesandoId(null);
    }
  }

  if (cargando) {
    return <section className="rounded-3xl bg-white p-8 shadow" role="status">Cargando productos desde DummyJSON...</section>;
  }

  if (errorCarga) {
    return (
      <section className="rounded-3xl bg-white p-8 shadow">
        <p role="alert" className="mb-4 text-red-700">{errorCarga}</p>
        <button onClick={() => setReintentos((n) => n + 1)} className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-sm text-white"><RefreshCw size={17} /> Reintentar</button>
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Administración de productos</h2>
          <p className="mt-1 text-sm text-slate-500">Catálogo de DummyJSON · altas, ediciones y bajas de demostración</p>
        </div>
        <button type="button" onClick={abrirNuevo} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-800">
          <PackagePlus size={19} /> Agregar producto
        </button>
      </div>

      <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end">
          <label className="flex-1 text-xs font-semibold text-slate-600">
            Buscar por título
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
              <Search size={18} className="shrink-0 text-slate-400" />
              <input type="search" value={busqueda} onChange={(e) => actualizarFiltros({ busqueda: e.target.value, pagina: 1 }, { reemplazar: true })} placeholder="Nombre del producto..." className="w-full bg-transparent py-3 text-sm outline-none" />
            </div>
          </label>
          <label className="w-full text-xs font-semibold text-slate-600 md:w-64">
            Filtrar por categoría
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700" value={categoria} onChange={(e) => actualizarFiltros({ categoria: e.target.value, pagina: 1 })}>
              <option value="">Todas las categorías</option>
              {categorias.map((c) => <option key={c} value={c}>{c.replaceAll('-', ' ')}</option>)}
            </select>
          </label>
          <button type="button" onClick={() => actualizarFiltros({ busqueda: '', categoria: '', pagina: 1 })} className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-blue-700 hover:bg-blue-50">
            <FilterX size={17} /> Limpiar filtros
          </button>
        </div>

        {errorAccion && <div role="alert" className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorAccion}</div>}
        {aviso && <div role="status" className="mb-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">{aviso}</div>}

        <TablaProductos productos={productosPagina} onEditar={abrirEdicion} onEliminar={borrarProducto} procesandoId={procesandoId} />
        <Paginacion pagina={paginaActual} limite={limite} total={filtrados.length} onPagina={(n) => actualizarFiltros({ pagina: n })} onLimite={(n) => actualizarFiltros({ limite: n, pagina: 1 })} />
      </div>

      <p className="px-2 text-xs text-slate-500">Nota: DummyJSON simula las peticiones de escritura, pero no guarda sus cambios en el servidor. Las altas y los cambios solo permanecen mientras esta vista esté abierta.</p>

      {modal && (
        <ModalProducto
          key={modal.producto?.id ?? 'nuevo'}
          producto={modal.producto}
          categorias={categorias}
          guardando={guardando}
          error={errorAccion}
          onGuardar={guardarProducto}
          onCerrar={() => { if (!guardando) setModal(null); }}
        />
      )}
    </div>
  );
}
