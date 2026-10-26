import logo from '../assets/logo1.png';

const opciones = [
  { id: 'inicio', texto: 'Inicio' },
  { id: 'productos', texto: 'Productos' },
  { id: 'configuracion', texto: 'Configuración' },
];

export default function Sidebar({ activa, onChange, onLogout }) {
  const base = 'text-left px-5 py-3 rounded-full font-semibold text-blue-700';

  return (
    <aside className="w-64 bg-white min-h-screen p-4 flex flex-col gap-2">
      <img src={logo} alt="Next Voto" className="w-40 mx-auto mb-8" />

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