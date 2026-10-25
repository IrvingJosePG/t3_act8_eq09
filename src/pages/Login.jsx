import { useState } from 'react';
import { loginUser } from '../services/auth';
import bgLogin from '../assets/img/bg-login.png';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Por favor, completa ambos campos.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const userData = await loginUser(username, password);
      onLoginSuccess(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white font-sans p-4 md:p-6">
      
      {/* Mitad Izquierda: Formulario */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 relative">
        {/* Espacio para el Logo top-left */}
        <div className="absolute top-4 left-8 md:top-8 md:left-24 w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
           <span className="text-white font-bold text-xl">N</span>
        </div>

        <div className="max-w-sm mt-16">
          <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-2">Inicio de sesión</p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">¡Hola de nuevo!</h2>
          <p className="text-gray-400 text-sm mb-8">Ingresa tus datos para continuar con tu día.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm"
                placeholder="correo@ejemplo.com (Usa: emilys)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm"
                placeholder="Introduce tu contraseña (Usa: emilyspass)"
              />
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {error && (
              <div className="text-red-500 text-xs font-semibold text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30 disabled:opacity-70"
            >
              {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
            </button>
            
            <div className="relative flex items-center justify-center mt-6">
              <hr className="w-full border-gray-200" />
              <span className="absolute bg-white px-3 text-xs text-gray-400">o continúa con</span>
            </div>

            <button
              type="button"
              className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mt-6"
            >
              <span className="text-blue-600 font-bold text-lg">G</span> Continuar con Google
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-8">
            ¿Aún no tienes una cuenta? <a href="#" className="text-blue-600 font-semibold hover:underline">Regístrate</a>
          </p>
        </div>
      </div>

      {/* Mitad Derecha: Panel Azul */}
      {/* Reemplaza bg-blue-600 por tu imagen importada agregando: style={{ backgroundImage: `url(${bgLogin})`, backgroundSize: 'cover' }} */}
      <div className="hidden md:flex w-1/2 bg-blue-600 rounded-[2.5rem] relative overflow-hidden items-end p-16">
        
        {/* Círculo decorativo top-left */}
        <div className="absolute top-12 left-12 w-8 h-8 border-4 border-white/30 rounded-full"></div>

        <div className="relative z-10 w-full">
          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold tracking-widest border border-white/30 uppercase">
            Tu Espacio
          </span>
          <h1 className="text-5xl font-bold text-white mt-6 mb-4 leading-tight">
            Todo en un solo<br/>lugar.
          </h1>
          <div className="flex justify-between items-end text-blue-100 text-sm">
            <p className="max-w-xs">
              Un espacio sencillo para organizarte, avanzar y hacer más cada día.
            </p>
            <span className="font-mono opacity-60">01 / 01</span>
          </div>
        </div>
      </div>

    </div>
  );
}