import { useState } from 'react';
import { Search } from 'lucide-react';

export default function Alumnos({ alumnos }) {
  const [busqueda, setBusqueda] = useState('');

  const lista = alumnos.filter((a) =>
    `${a.firstName} ${a.lastName}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl shadow p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold">Alumnos.</h2>
        <div className="bg-gray-50 rounded-lg px-4 py-2 flex items-center gap-2">
          <Search size={20} />
          <input
            placeholder="Buscar alumno"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <table className="w-full text-left text-sm">
        <thead className="text-gray-400">
          <tr className="border-b">
            <th className="pb-3 font-normal">Alumno</th>
            <th className="font-normal">Correo</th>
            <th className="font-normal">Edad</th>
            <th className="font-normal">Universidad</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((a) => (
            <tr key={a.id} className="border-b">
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <img src={a.image} alt={a.firstName} className="w-10 h-10 rounded-full bg-gray-100" />
                  <span className="font-bold">{a.firstName} {a.lastName}</span>
                </div>
              </td>
              <td>{a.email}</td>
              <td>{a.age}</td>
              <td>{a.university}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {lista.length === 0 && <p className="text-center py-6">No hay resultados.</p>}
    </div>
  );
}