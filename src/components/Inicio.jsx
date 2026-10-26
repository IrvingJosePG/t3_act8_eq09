import TablaCuestionarios from './TablaCuestionarios';

export default function Inicio({ cuestionarios, alumnos }) {
  const terminados = cuestionarios.filter((c) => c.completed).length;
  const activos = cuestionarios.length - terminados;
  const tasa = cuestionarios.length ? Math.round((terminados / cuestionarios.length) * 100) : 0;

  const tarjetas = [
    { texto: 'Cuestionarios Activos', valor: activos },
    { texto: 'Total de Alumnos Evaluados', valor: alumnos.length },
    { texto: 'Tasa de Participación', valor: `${tasa}%` },
  ];

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mb-6">
        {tarjetas.map((t) => (
          <div key={t.texto} className="bg-[#D6E6FF] rounded-3xl shadow-md px-6 py-5 flex items-center justify-between">
            <span className="text-sm font-medium w-28">{t.texto}</span>
            <span className="w-16 h-16 rounded-full border-4 border-green-600 bg-white flex items-center justify-center font-bold">
              {t.valor}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow p-8">
        <h2 className="font-bold mb-4">Todos mis cuestionarios.</h2>
        <TablaCuestionarios lista={cuestionarios.slice(0, 3)} alumnos={alumnos} />
      </div>
    </div>
  );
}