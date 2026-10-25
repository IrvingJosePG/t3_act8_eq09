import { useState } from 'react';
import { loginUser } from '../services/auth';
import bgLogin from '../assets/img/bg-login.svg';
import logoNextvoto from '../assets/img/logo_nextvoto.png';

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
        
        {/* Logo top-left real */}
        <div className="absolute top-4 left-8 md:top-8 md:left-12">
           <img src={logoNextvoto} alt="Logo NextVoto" className="h-20 lg:h-40 w-auto object-contain" />
        </div>

        {/* FORMULARIO  */}
        <div className="max-w-xl w-full mx-auto">
          <p className="text-blue-600 text-base font-bold tracking-widest uppercase mb-2">Inicio de sesión</p>
          <h2 className="text-6xl font-extrabold text-gray-900 mb-2">¡Hola de nuevo!</h2>
          <p className="text-gray-400 text-lg mb-8">Ingresa tus datos para continuar con tu día.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-1">Correo electrónico</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-base"
                placeholder="correo@ejemplo.com (Usa: emilys)"
              />
            </div>
            
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-base"
                placeholder="Introduce tu contraseña (Usa: emilyspass)"
              />
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-base font-semibold text-blue-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {error && (
              <div className="text-red-500 text-base font-semibold text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-700 text-lg text-white py-4 rounded-xl font-semibold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30 disabled:opacity-70"
            >
              {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
            </button>
            
            <div className="relative flex items-center justify-center mt-6">
              <hr className="w-full border-gray-200" />
              <span className="absolute bg-white px-3 text-base text-gray-400">o continúa con</span>
            </div>

            <button
              type="button"
              className="w-full bg-white text-lg border border-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mt-6"
            >
              <span className="text-blue-600 font-bold text-xl">G</span> Continuar con Google
            </button>
          </form>

          <p className="text-center text-base text-gray-500 mt-8">
            ¿Aún no tienes una cuenta? <a href="#" className="text-blue-600 font-semibold hover:underline">Regístrate</a>
          </p>
        </div>
      </div>

      {/* Mitad Derecha: Panel Azul con tu imagen de fondo */}
      <div 
        className="hidden md:flex w-1/2 rounded-[2.5rem] relative overflow-hidden items-end p-16"
        style={{ backgroundImage: `url(${bgLogin})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
      >
    
        <div className="absolute top-12 left-12 w-12 h-12 border-8 border-white/80 rounded-full"></div>

        <div className="relative z-10 w-full">
          <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-lg font-semibold tracking-widest border border-white/30 uppercase">
            Tu Espacio
          </span>
          <h1 className="text-7xl font-bold text-white mt-6 mb-4 leading-tight">
            Todo en un solo<br/>lugar.
          </h1>
          <div className="flex justify-between items-end text-blue-100 text-3xl">
            <p className="max-w-lg drop-shadow-md">
              Un espacio sencillo para organizarte, avanzar y hacer más cada día.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}