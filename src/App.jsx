import Login from './pages/Login';

export default function App() {
  const handleLogin = (user) => {
    console.log("Datos del usuario logueado:", user);
    alert(`¡Bienvenido ${user.firstName}! Inicio de sesión exitoso.`);
  };

  return (
    <Login onLoginSuccess={handleLogin} />
  );
}