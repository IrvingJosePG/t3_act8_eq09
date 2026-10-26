import { SquarePen, Trash2, Eye } from 'lucide-react';

export default function TablaCuestionarios({ lista, alumnos }) {
  const nombreAlumno = (id) => {
    const a = alumnos.find((x) => x.id === id);
    return a ? `${a.firstName} ${a.lastName}` : '—';
  };

  return (
    <div>
      <table className="w-full text-left text-sm">
        <thead className="text-gray-400">
          <tr className="border-b">
            <th className="pb-3 font-normal">Cuestionario</th>
            <th className="font-normal">Alumno asignado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lista.map((c) => (
            <tr key={c.id} className="border-b">
              <td className="py-4">
                <p className="font-bold">{c.completed ? 'Terminado' : 'Activo'}</p>
                <p className="text-[11px] text-gray-400 max-w-md">{c.todo}</p>
              </td>
              <td>{nombreAlumno(c.userId)}</td>
              <td>
                <div className="flex gap-2">
                  <button className="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    {c.completed ? <Eye size={18} /> : <SquarePen size={18} />}
                  </button>
                  <button className="bg-gradient-to-b from-blue-600 to-blue-900 text-white w-10 h-10 rounded-lg flex items-center justify-center">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {lista.length === 0 && <p className="text-center py-6">No hay resultados.</p>}
    </div>
  );
}