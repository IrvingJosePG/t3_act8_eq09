import { Pencil, Trash2, Package } from 'lucide-react';

const dinero = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'USD' });

export default function TablaProductos({ productos, onEditar, onEliminar, procesandoId }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[750px] text-left text-sm">
        <thead className="border-b border-slate-200 text-xs font-medium uppercase tracking-wider text-slate-400">
          <tr>
            <th scope="col" className="pb-4 pr-4">Producto</th>
            <th scope="col" className="pb-4 pr-4">Categoría</th>
            <th scope="col" className="pb-4 pr-4">Precio</th>
            <th scope="col" className="pb-4 pr-4">Existencias</th>
            <th scope="col" className="pb-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="border-b border-slate-100 last:border-0 hover:bg-blue-50/40">
              <td className="py-3 pr-4">
                <div className="flex min-w-0 items-center gap-3">
                  {producto.thumbnail ? (
                    <img className="h-12 w-12 shrink-0 rounded-xl border border-gray-100 bg-white object-contain" src={producto.thumbnail} alt="" loading="lazy" />
                  ) : (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Package size={22} /></span>
                  )}
                  <div className="min-w-0">
                    <p className="max-w-[310px] font-semibold text-slate-800">{producto.title}</p>
                    <p className="text-xs text-slate-400">
                      {producto._soloLocal ? 'Agregado en esta sesión' : `ID: ${producto.id}`}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4"><span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium capitalize text-blue-800">{producto.category.replaceAll('-', ' ')}</span></td>
              <td className="py-3 pr-4 font-semibold text-slate-800">{dinero.format(producto.price)}</td>
              <td className="py-3 pr-4">{producto.stock ?? '—'}</td>
              <td className="py-3">
                <div className="flex items-center justify-end gap-2">
                  <button type="button" disabled={procesandoId !== null} onClick={() => onEditar(producto)} aria-label={`Editar ${producto.title}`} title="Editar producto" className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-40"><Pencil size={17} /></button>
                  <button type="button" disabled={procesandoId !== null} onClick={() => onEliminar(producto)} aria-label={`Eliminar ${producto.title}`} title="Eliminar producto" className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-40"><Trash2 size={17} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {productos.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No hay productos que coincidan con los filtros.</p>}
    </div>
  );
}
