export default function Metricas({ cuestionarios }) {
  const terminados = cuestionarios.filter((c) => c.completed).length;
  const activos = cuestionarios.length - terminados;
  const pct = (n) => (cuestionarios.length ? Math.round((n / cuestionarios.length) * 100) : 0);

  const barras = [
    { texto: 'Activos', valor: activos, color: 'bg-blue-600' },
    { texto: 'Terminados', valor: terminados, color: 'bg-green-600' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow p-8">
      <h2 className="font-bold mb-6">Métricas y Resultados.</h2>
      {barras.map((b) => (
        <div key={b.texto} className="mb-5">
          <p className="text-sm mb-1">{b.texto}: {b.valor} ({pct(b.valor)}%)</p>
          <div className="bg-gray-100 rounded-full h-4">
            <div className={`${b.color} h-4 rounded-full`} style={{ width: `${pct(b.valor)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}