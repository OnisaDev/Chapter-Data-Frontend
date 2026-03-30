// api.js — Cliente centralizado para comunicarse con el backend FastAPI
// Coloca este archivo en: src/api.js

const BASE_URL = 'http://localhost:8000';

// ─── HELPERS ────────────────────────────────────────────────────────

export function getUsuario() {
  const data = localStorage.getItem('usuario');
  return data ? JSON.parse(data) : null;
}

async function request(method, endpoint, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Error en la petición');
  }
  return data;
}

// Añade el id_usuario como query param automáticamente
function urlConUsuario(endpoint) {
  const usuario = getUsuario();
  const id = usuario?.id;
  return `${endpoint}${endpoint.includes('?') ? '&' : '?'}id_usuario=${id}`;
}

// ─── AUTENTICACIÓN ───────────────────────────────────────────────────

export async function registrar(username, email, password) {
  return request('POST', '/register', { username, email, password });
}

export async function login(identifier, password) {
  const data = await request('POST', '/login', { identifier, password });
  // Guardamos el usuario en localStorage para mantener la sesión en el frontend
  localStorage.setItem('usuario', JSON.stringify(data.usuario));
  return data;
}

export async function logout() {
  await request('POST', '/logout');
  localStorage.removeItem('usuario');
}

// ─── LIBROS ──────────────────────────────────────────────────────────

export async function getLibros() {
  return request('GET', urlConUsuario('/libros'));
}

export async function getResumenLibros() {
  return request('GET', urlConUsuario('/libros/resumen'));
}

export async function addLibro(libro) {
  return request('POST', urlConUsuario('/libros'), libro);
}

export async function editarLibro(id_libro, datos) {
  return request('PUT', `/libros/${id_libro}`, datos);
}

export async function eliminarLibro(id_libro) {
  return request('DELETE', `/libros/${id_libro}`);
}

// ─── GÉNEROS ─────────────────────────────────────────────────────────

export async function getGeneros() {
  return request('GET', '/generos');
}

// ─── ESTADÍSTICAS ────────────────────────────────────────────────────

export async function getEstadisticas() {
  return request('GET', urlConUsuario('/estadisticas'));
}

// ─── USUARIO ─────────────────────────────────────────────────────────

export async function eliminarCuenta() {
  await request('DELETE', urlConUsuario('/usuario'));
  localStorage.removeItem('usuario');
}