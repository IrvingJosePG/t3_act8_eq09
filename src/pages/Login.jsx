import { useState } from 'react';
import { loginUser } from '../services/auth';
import AuthBanner from '../components/AuthBanner';   {/* Importancion de componentes reutilizables */}
import InputField from '../components/InputField';
import Button from '../components/Button';

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
    <div className="flex min-h-screen bg-white font-sans p-4 md:p-6">
      
      {/* Mitad Izquierda: Formulario */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-10 md:py-12">
        
        {/* FORMULARIO  */}
        <div className="max-w-xl w-full mx-auto">
          <p className="text-blue-600 text-base font-bold tracking-widest uppercase mb-2">Inicio de sesión</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2">¡Hola de nuevo!</h2>
          <p className="text-gray-400 text-lg mb-8">Ingresa tus datos para continuar con tu día.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <InputField 
              label="Correo electrónico" 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="correo@ejemplo.com (Usa: emilys)" 
            />
            
            <InputField 
              label="Contraseña" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Introduce tu contraseña (Usa: emilyspass)" 
            />

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

            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
            </Button>
            
            <div className="relative flex items-center justify-center mt-6">
              <hr className="w-full border-gray-200" />
              <span className="absolute bg-white px-3 text-base text-gray-400">o continúa con</span>
            </div>

            <Button type="button" variant="secondary">
              <span className="text-blue-600 font-bold text-xl">G</span> Continuar con Google
            </Button>
          </form>

          <p className="text-center text-base text-gray-500 mt-8">
            ¿Aún no tienes una cuenta? <a href="#" className="text-blue-600 font-semibold hover:underline">Regístrate</a>
          </p>
        </div>
      </div>

      {/* Mitad Derecha: Panel Azul importado de componentes*/}
      <AuthBanner />

    </div>
  );
}