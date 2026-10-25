export const loginUser = async (username, password) => {
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password,
      expiresInMins: 60,
    })
  });

  if (!response.ok) {
    throw new Error('Usuario o contraseña incorrectos. Intenta de nuevo.');
  }

  return await response.json();
};