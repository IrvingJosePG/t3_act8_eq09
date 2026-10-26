import { useState } from 'react';
import { Filter, RotateCcw, Search } from 'lucide-react';
import TablaCuestionarios from './TablaCuestionarios';

export default function Cuestionarios({ cuestionarios, alumnos }) {
  const [busqueda, setBusqueda] = useState('');
  const [estado, setEstado] = useState('');
  const [orden, setOrden] = useState('recientes');

  let lista = cuestionarios.filter(
    (c) =>
      c.todo.toLowerCase().includes(busqueda.toLowerCase()) &&
      (estado === '' || (c.completed ? 'Terminado' : 'Activo') === estado)
  );
  lista = [...lista].sort((a, b) => (orden === 'recientes' ? b.id - a.id : a.id - b.id));

  const limpiar = () => {
    setBusqueda('');
    setEstado('');
    setOrden('recientes');
  };

  return (
    <div>
      {/* Barra de filtros */}
      <div className="bg-white rounded-full shadow w-fit mx-auto flex items-center divide-x text-sm mb-6 px-6">
        <div className="flex items-center gap-4 pr-6 py-3">
          <Filter size={28} />
          <span className="font-medium">Filtrar por:</span>
        </div>
        <select value={orden} onChange={(e) => setOrden(e.target.value)} className="px-6 py-3 bg-transparent font-medium">
          <option value="recientes">Más recientes</option>
          <option value="antiguos">Más antiguos</option>
        </select>
        <select value={estado} onChange={(e) => setEstado(e.target.value)} className="px-6 py-3 bg-transparent font-medium">
          <option value="">Estado</option>
          <option value="Activo">Activo</option>
          <option value="Terminado">Terminado</option>
        </select>
        <button onClick={limpiar} className="pl-6 py-3 text-blue-700 flex items-center gap-2">
          <RotateCcw size={14} /> Limpiar filtros
        </button>
      </div>

      {/* Tarjeta de la tabla */}
      <div className="bg-white rounded-3xl shadow p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold">Todos mis cuestionarios.</h2>
          <div className="bg-gray-50 rounded-lg px-4 py-2 flex items-center gap-2">
            <Search size={20} />
            <input
              placeholder="Buscar por título"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="bg-transparent text-sm outline-none"
            />
          </div>
        </div>
        <TablaCuestionarios lista={lista} alumnos={alumnos} />
      </div>
    </div>
  );
}