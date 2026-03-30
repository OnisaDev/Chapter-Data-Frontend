import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import userIcon from '../assets/usuario.png';
import './Biblioteca.css';

// Datos de prueba hasta conectar el backend
const librosMock = [
  {
    id: 1,
    titulo: 'La anomalía',
    autor: 'Hervé Le Tellier',
    genero: 'Ciencia ficción',
    usuario: 'MCPT',
    isbn: '978-8432239738',
    fechaLectura: '13/02/2026',
    puntuacion: 3,
    resena: 'Una novela sorprendente y muy original que mezcla ciencia ficción con reflexión filosófica y drama humano. Lo que más me gustó fue cómo el autor juega con la idea de la identidad y el destino, planteando una situación imposible que obliga a los personajes a cuestionarse quiénes son realmente.'
  },
  {
    id: 2,
    titulo: 'La vida invisible de Addie LaRue',
    autor: 'V.E. Schwab',
    genero: 'Fantasía',
    usuario: 'MCPT',
    isbn: '978-8418038',
    fechaLectura: '20/03/2026',
    puntuacion: 5,
    resena: 'Una historia preciosa sobre la memoria y el olvido.'
  },
  {
    id: 3,
    titulo: 'Donde cantan las langostas',
    autor: 'Delia Owens',
    genero: 'Drama',
    usuario: 'MCPT',
    isbn: '978-8417347',
    fechaLectura: '01/01/2026',
    puntuacion: 4,
    resena: 'Muy bonita, con una naturaleza increíblemente descrita.'
  },
];

const FILTROS = ['Título', 'Autor', 'Género', 'ISBN'];

function Biblioteca() {
  const navigate = useNavigate();
  const [indice, setIndice] = useState(0);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('Título');

  const librosFiltrados = librosMock.filter((libro) => {
    const campo = filtro === 'Título' ? libro.titulo
      : filtro === 'Autor' ? libro.autor
      : filtro === 'Género' ? libro.genero
      : libro.isbn;
    return campo.toLowerCase().includes(busqueda.toLowerCase());
  });

  const libro = librosFiltrados[indice];

  const handleSiguiente = () => {
    if (indice < librosFiltrados.length - 1) setIndice(indice + 1);
  };

  const handleAnterior = () => {
    if (indice > 0) setIndice(indice - 1);
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    setIndice(0);
  };

  return (
    <div className="biblioteca-container">
      {/* HEADER */}
      <div className="header">
        <img src={logo} className="logo" alt="Chapter Data Logo" />
        <h1 className="title">El registro perfecto para tu próxima gran historia</h1>
      </div>

      <h2 className="biblioteca-title">MI BIBLIOTECA</h2>

      {/* BUSCADOR */}
      <div className="buscador-biblioteca">
        <span className="lupa">🔍</span>
        <input
          type="text"
          placeholder="Búsqueda"
          value={busqueda}
          onChange={handleBusqueda}
          className="buscador-input"
        />
        <select
          value={filtro}
          onChange={(e) => { setFiltro(e.target.value); setIndice(0); }}
          className="filtro-select"
        >
          {FILTROS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div className="biblioteca-content">
        {/* COLUMNA IZQUIERDA: botones */}
        <div className="menu-actions">
          <button className="btn-menu" onClick={() => navigate('/addbook')}>Añadir libro</button>
          <button className="btn-menu" onClick={() => navigate('/historial')}>Consultar Historial</button>
          <button className="btn-menu" onClick={() => navigate('/estadisticas')}>Estadísticas</button>
        </div>

        {/* CENTRO: ficha del libro */}
        <div className="biblioteca-center">
          {libro ? (
            <>
              <div className="flecha-anterior">
                {indice > 0 && (
                  <span onClick={handleAnterior} className="flecha">»</span>
                )}
              </div>

              <div className="ficha-libro">
                <div className="ficha-row">
                  <span className="ficha-label">TÍTULO</span>
                  <span className="ficha-valor">{libro.titulo}</span>
                </div>
                <div className="ficha-row">
                  <span className="ficha-label">AUTOR</span>
                  <span className="ficha-valor">{libro.autor}</span>
                </div>
                <div className="ficha-row">
                  <span className="ficha-label">GÉNERO</span>
                  <span className="ficha-valor">{libro.genero}</span>
                </div>
                <div className="ficha-row">
                  <span className="ficha-label">USUARIO</span>
                  <span className="ficha-valor">{libro.usuario}</span>
                </div>
                <div className="ficha-row">
                  <span className="ficha-label">ISBN</span>
                  <span className="ficha-valor">{libro.isbn}</span>
                </div>
                <div className="ficha-row">
                  <span className="ficha-label">FECHA LECTURA</span>
                  <span className="ficha-valor">{libro.fechaLectura}</span>
                </div>
                <div className="ficha-row">
                  <span className="ficha-label">PUNTUACIÓN</span>
                  <div className="estrellas-readonly">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`star ${star <= libro.puntuacion ? 'filled' : ''}`}>★</span>
                    ))}
                  </div>
                </div>
                <div className="ficha-row ficha-row-resena">
                  <span className="ficha-label">RESEÑA</span>
                  <div className="resena-box">{libro.resena}</div>
                </div>
              </div>

              <div className="flecha-siguiente">
                {indice < librosFiltrados.length - 1 && (
                  <span onClick={handleSiguiente} className="flecha">» Siguiente</span>
                )}
              </div>
            </>
          ) : (
            <p className="sin-resultados">No se encontraron libros.</p>
          )}
        </div>

        {/* COLUMNA DERECHA: perfil */}
        <div className="menu-profile">
          <div className="profile-card">
            <img src={userIcon} alt="Usuario" className="user-icon" />
            <p>Perfil de usuario</p>
            <span className="username">MCPT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Biblioteca;