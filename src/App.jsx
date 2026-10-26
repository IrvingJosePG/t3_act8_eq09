import { useState } from 'react';
import Login from './pages/Login';
import Sistema from './pages/Sistema';

export default function App() {
  const [user, setUser] = useState(null);

  // Sin sesión solo se ve el login
  if (!user) return <Login onLoginSuccess={setUser} />;

  return <Sistema user={user} onLogout={() => setUser(null)} />;
}