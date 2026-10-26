import { useEffect, useState } from 'react';
import { getCuestionarios, getAlumnos } from '../services/api';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Inicio from '../components/Inicio';
import Cuestionarios from '../components/Cuestionarios';
import Metricas from '../components/Metricas';
import Alumnos from '../components/Alumnos';

export default function Sistema({ user, onLogout }) {
  const [seccion, setSeccion] = useState('inicio');
  const [cuestionarios, setCuestionarios] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargar() {
      try {
        setCuestionarios(await getCuestionarios());
        setAlumnos(await getAlumnos());
      } catch (err) {
        setError(err.message);
      }
      setCargando(false);
    }
    cargar();
  }, []);

  const titulos = {
    inicio: `Bienvenido, ${user.firstName} 👋`,
    cuestionarios: 'Mis cuestionarios',
    metricas: 'Métricas y Resultados',
    alumnos: 'Alumnos',
    configuracion: 'Configuración',
  };

  function contenido() {
    if (cargando) return <p className="text-blue-700">Cargando...</p>;
    if (error) return <p className="text-red-600">⚠️ {error}</p>;
    if (seccion === 'inicio') return <Inicio cuestionarios={cuestionarios} alumnos={alumnos} />;
    if (seccion === 'cuestionarios') return <Cuestionarios cuestionarios={cuestionarios} alumnos={alumnos} />;
    if (seccion === 'metricas') return <Metricas cuestionarios={cuestionarios} />;
    if (seccion === 'alumnos') return <Alumnos alumnos={alumnos} />;
    return <h2>Configuración</h2>;
  }

  return (
    <div className="flex min-h-screen bg-[#E7EFFD]">
      <Sidebar activa={seccion} onChange={setSeccion} onLogout={onLogout} />
      <div className="flex-1">
        <Navbar user={user} titulo={titulos[seccion]} onLogout={onLogout} />
        <main className="p-6">{contenido()}</main>
      </div>
    </div>
  );
}