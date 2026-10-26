import { useState } from 'react';
import { X } from 'lucide-react';

const VACIO = {
  title: '',
  description: '',
  category: '',
  price: '',
  stock: '',
  thumbnail: '',
};

export default function ModalProducto({ producto, categorias, guardando, error, onGuardar, onCerrar }) {
  const editando = Boolean(producto);
  const [formulario, setFormulario] = useState(() =>
    producto
      ? {
          title: producto.title ?? '',
          description: producto.description ?? '',
          category: producto.category ?? '',
          price: String(producto.price ?? ''),
          stock: String(producto.stock ?? 0),
          thumbnail: producto.thumbnail ?? '',
        }
      : VACIO,
  );
  const [errores, setErrores] = useState({});

  function modificar(campo, valor) {
    setFormulario((anterior) => ({ ...anterior, [campo]: valor }));
    setErrores((anterior) => ({ ...anterior, [campo]: '' }));
  }

  function enviar(evento) {
    evento.preventDefault();
    if (guardando) return;

    const pendientes = {};
    const precio = Number(formulario.price);
    const existencias = Number(formulario.stock);

    if (!formulario.title.trim()) pendientes.title = 'Escribe un título.';
    if (!formulario.category.trim()) pendientes.category = 'Selecciona una categoría.';
    if (formulario.price.trim() === '' || !Number.isFinite(precio) || precio < 0) {
      pendientes.price = 'El precio debe ser un número mayor o igual a cero.';
    }
    if (formulario.stock.trim() === '' || !Number.isInteger(existencias) || existencias < 0) {
      pendientes.stock = 'Las existencias deben ser un entero mayor o igual a cero.';
    }
    if (Object.keys(pendientes).length) {
      setErrores(pendientes);
      return;
    }

    onGuardar({
      title: formulario.title.trim(),
      description: formulario.description.trim(),
      category: formulario.category,
      price: precio,
      stock: existencias,
      thumbnail: formulario.thumbnail.trim(),
    });
  }

  const input = 'mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4" onMouseDown={(e) => { if (e.target === e.currentTarget && !guardando) onCerrar(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="modal-producto-titulo" className="my-auto w-full max-w-xl rounded-3xl bg-white p-5 shadow-2xl sm:p-7">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 id="modal-producto-titulo" className="text-xl font-bold text-slate-900">
              {editando ? 'Editar producto' : 'Agregar producto'}
            </h2>
            <p className="mt-1 text-xs text-slate-500">Los cambios se reflejan en esta sesión de prueba.</p>
          </div>
          <button type="button" aria-label="Cerrar formulario" onClick={onCerrar} disabled={guardando} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"><X size={20} /></button>
        </div>

        <form onSubmit={enviar} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2 text-sm font-semibold text-slate-700">
            Nombre del producto *
            <input autoFocus maxLength={120} className={input} value={formulario.title} onChange={(e) => modificar('title', e.target.value)} placeholder="Ej. Audífonos inalámbricos" />
            {errores.title && <span className="block pt-1 text-xs text-red-600">{errores.title}</span>}
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Categoría *
            <select className={input} value={formulario.category} onChange={(e) => modificar('category', e.target.value)}>
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => <option value={categoria} key={categoria}>{categoria.replaceAll('-', ' ')}</option>)}
            </select>
            {errores.category && <span className="block pt-1 text-xs text-red-600">{errores.category}</span>}
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Precio (USD) *
            <input className={input} type="number" min="0" step="0.01" value={formulario.price} onChange={(e) => modificar('price', e.target.value)} placeholder="0.00" />
            {errores.price && <span className="block pt-1 text-xs text-red-600">{errores.price}</span>}
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Existencias *
            <input className={input} type="number" min="0" step="1" value={formulario.stock} onChange={(e) => modificar('stock', e.target.value)} placeholder="0" />
            {errores.stock && <span className="block pt-1 text-xs text-red-600">{errores.stock}</span>}
          </label>

          <label className="sm:col-span-2 text-sm font-semibold text-slate-700">
            URL de imagen (opcional)
            <input className={input} type="url" value={formulario.thumbnail} onChange={(e) => modificar('thumbnail', e.target.value)} placeholder="https://ejemplo.com/producto.jpg" />
          </label>

          <label className="sm:col-span-2 text-sm font-semibold text-slate-700">
            Descripción (opcional)
            <textarea className={input} rows={3} maxLength={500} value={formulario.description} onChange={(e) => modificar('description', e.target.value)} placeholder="Detalles del producto" />
          </label>

          {producto?._soloLocal && (
            <p className="sm:col-span-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">
              Este producto fue creado durante la sesión: la API no conserva las altas, así que su edición solo se puede reflejar localmente.
            </p>
          )}

          {error && (
            <p role="alert" className="sm:col-span-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>
          )}

          <div className="sm:col-span-2 flex flex-wrap justify-end gap-3 pt-1">
            <button type="button" disabled={guardando} onClick={onCerrar} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50">Cancelar</button>
            <button type="submit" disabled={guardando} className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-50">
              {guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Agregar producto'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
