export default function Navbar({ user, titulo, onLogout }) {
  return (
    <header className="bg-blue-100 rounded-b-3xl px-8 py-5 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <h1 className="text-lg text-gray-900">{titulo}</h1>
        <button className="bg-white rounded-full px-5 py-2 text-sm shadow">
           Agregar producto
        </button>
      </div>

      <div className="flex items-center gap-3">
        <img src={user.image} alt="perfil" className="w-10 h-10 rounded-full bg-white" />
        <span className="font-semibold">{user.firstName} {user.lastName}</span>
        <button
          onClick={onLogout}
          className="ml-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-full"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}