import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OPCIONES_LIMITE } from '../hooks/usePaginacionUrl';

function paginasCercanas(actual, total) {
  const inicio = Math.max(1, Math.min(actual - 2, total - 4));
  const fin = Math.min(total, inicio + 4);
  return Array.from({ length: Math.max(0, fin - inicio + 1) }, (_, i) => inicio + i);
}

export default function Paginacion({ pagina, limite, total, onPagina, onLimite }) {
  const totalPaginas = Math.max(1, Math.ceil(total / limite));
  const primeraFila = total === 0 ? 0 : (pagina - 1) * limite + 1;
  const ultimaFila = Math.min(pagina * limite, total);
  const boton = 'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 pt-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <span>Mostrando <b>{primeraFila}–{ultimaFila}</b> de <b>{total}</b></span>
        <label className="flex items-center gap-2">
          Registros por página
          <select aria-label="Registros por página" value={limite} onChange={(e) => onLimite(Number(e.target.value))} className="rounded-lg border border-slate-200 bg-white px-2 py-2 font-semibold text-blue-800">
            {OPCIONES_LIMITE.map((cantidad) => <option key={cantidad} value={cantidad}>{cantidad}</option>)}
          </select>
        </label>
      </div>

      <nav aria-label="Paginación de productos" className="flex flex-wrap items-center gap-1">
        <button className={`${boton} border-slate-200`} disabled={pagina === 1} onClick={() => onPagina(pagina - 1)} aria-label="Página anterior"><ChevronLeft size={18} /></button>
        {paginasCercanas(pagina, totalPaginas).map((numero) => (
          <button key={numero} onClick={() => onPagina(numero)} aria-label={`Ir a la página ${numero}`} aria-current={numero === pagina ? 'page' : undefined} className={`${boton} ${numero === pagina ? 'border-blue-700 bg-blue-700 text-white' : 'border-slate-200 hover:bg-blue-50'}`}>
            {numero}
          </button>
        ))}
        <button className={`${boton} border-slate-200`} disabled={pagina === totalPaginas} onClick={() => onPagina(pagina + 1)} aria-label="Página siguiente"><ChevronRight size={18} /></button>
        <span className="ml-2 text-xs text-slate-500">Página {pagina} de {totalPaginas}</span>
      </nav>
    </div>
  );
}
