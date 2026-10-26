import { useState } from 'react';
import { ClipboardPlus, ChevronDown } from 'lucide-react';

export default function Navbar({ user, titulo, onLogout }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="bg-[#D6E6FF] rounded-b-3xl px-8 py-5 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <h1 className="text-base">{titulo}</h1>
        <button className="bg-white rounded-full px-4 py-2 text-sm shadow flex items-center gap-2">
          <ClipboardPlus size={22} /> Crear cuestionario
        </button>
      </div>

      <div className="relative">
        <button onClick={() => setAbierto(!abierto)} className="flex items-center gap-3">
          <img src={user.image} alt="perfil" className="w-10 h-10 rounded-full bg-white" />
          <span className="font-semibold text-sm">{user.firstName} {user.lastName}</span>
          <ChevronDown size={18} />
        </button>

        {abierto && (
          <div className="absolute right-0 mt-3 bg-white rounded-xl shadow p-2 z-10">
            <button onClick={onLogout} className="px-4 py-2 text-sm text-blue-700 whitespace-nowrap">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}