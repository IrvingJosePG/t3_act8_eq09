export async function getProductos() {
  const res = await fetch('https://dummyjson.com/products?limit=0');
  if (!res.ok) throw new Error('No se pudieron cargar los productos');
  const data = await res.json();
  return data.products;
}

export async function getCategorias() {
  const res = await fetch('https://dummyjson.com/products/category-list');
  if (!res.ok) throw new Error('No se pudieron cargar las categorías');
  return res.json(); 
}