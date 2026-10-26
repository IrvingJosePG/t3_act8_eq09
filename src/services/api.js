const BASE = 'https://dummyjson.com';

async function pedir(ruta, mensajeError) {
  const res = await fetch(BASE + ruta);
  if (!res.ok) throw new Error(mensajeError);
  return res.json();
}

export async function getCuestionarios() {
  const data = await pedir('/todos?limit=0', 'No se pudieron cargar los cuestionarios');
  return data.todos;
}

export async function getAlumnos() {
  const data = await pedir('/users?limit=0&select=firstName,lastName,email,age,image,university', 'No se pudieron cargar los alumnos');
  return data.users;
}