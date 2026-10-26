import logo from '../assets/img/logo_nextvoto.png';

const opciones = [
  { id: 'inicio', texto: 'Inicio' },
  { id: 'cuestionarios', texto: 'Mis cuestionarios' },
  { id: 'metricas', texto: 'Métricas y Resultados' },
  { id: 'alumnos', texto: 'Alumnos' },
  { id: 'configuracion', texto: 'Configuración' },
];

export default function Sidebar({ activa, onChange, onLogout }) {
  const base = 'text-left px-6 py-3 rounded-full text-sm font-medium text-blue-700';

  return (
    <aside className="w-64 bg-white min-h-screen p-5 flex flex-col gap-3">
      <img src={logo} alt="Next Voto" className="w-40 mb-8" />

      {opciones.map((op) => (
        <button
          key={op.id}
          onClick={() => onChange(op.id)}
          className={`${base} ${activa === op.id ? 'bg-blue-100' : 'hover:bg-blue-50'}`}
        >
          {op.texto}
        </button>
      ))}

      <button onClick={onLogout} className={`${base} hover:bg-blue-50`}>
        Salir
      </button>
    </aside>
  );
}