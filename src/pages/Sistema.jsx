import { useEffect, useState } from 'react';
import { getCuestionarios, getAlumnos } from '../services/api';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Inicio from '../components/Inicio';
import Cuestionarios from '../components/Cuestionarios';
import Metricas from '../components/Metricas';
import Alumnos from '../components/Alumnos';
import Productos from './Productos';

const SECCIONES = ['inicio', 'cuestionarios', 'productos', 'metricas', 'alumnos', 'configuracion'];

function seccionDesdeUrl() {
  const params = new URLSearchParams(window.location.search);
  const solicitada = params.get('section');
  if (SECCIONES.includes(solicitada)) return solicitada;
  return params.has('page') ? 'productos' : 'inicio';
}

export default function Sistema({ user, onLogout }) {
  const [seccion, setSeccion] = useState(seccionDesdeUrl);

  useEffect(() => {
    const recuperarVista = () => setSeccion(seccionDesdeUrl());
    window.addEventListener('popstate', recuperarVista);
    return () => window.removeEventListener('popstate', recuperarVista);
  }, []);

  function cambiarSeccion(nuevaSeccion) {
    setSeccion(nuevaSeccion);
    const url = new URL(window.location.href);
    if (nuevaSeccion === 'productos') {
      url.searchParams.set('section', 'productos');
      if (!url.searchParams.has('page')) url.searchParams.set('page', '1');
      if (!url.searchParams.has('limit')) url.searchParams.set('limit', '10');
    } else {
      url.searchParams.set('section', nuevaSeccion);
      ['page', 'limit', 'q', 'category'].forEach((campo) => url.searchParams.delete(campo));
    }
    if (url.href !== window.location.href) window.history.pushState({}, '', url);
  }
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
    productos: 'Productos · CRUD',
  };

  function contenido() {
    if (seccion === 'productos') return <Productos />;
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
      <Sidebar activa={seccion} onChange={cambiarSeccion} onLogout={onLogout} />
      <div className="flex-1">
        <Navbar user={user} titulo={titulos[seccion]} onLogout={onLogout} />
        <main className="p-6">{contenido()}</main>
      </div>
    </div>
  );
}