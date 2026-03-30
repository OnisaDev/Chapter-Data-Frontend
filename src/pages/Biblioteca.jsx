import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import userIcon from '../assets/usuario.png';
import { getLibros, getUsuario } from '../api';
import './Biblioteca.css';

const FILTROS = ['Título', 'Autor', 'ISBN'];

function Biblioteca() {
  const navigate = useNavigate();
  const usuario = getUsuario();
  const [libros, setLibros] = useState([]);
  const [indice, setIndice] = useState(0);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('Título');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getLibros().then(setLibros).catch(() => setError('No se pudieron cargar los libros.')).finally(() => setCargando(false));
  }, []);

  const librosFiltrados = libros.filter((libro) => {
    const campo = filtro === 'Título' ? libro.titulo : filtro === 'Autor' ? libro.autor : libro.isbn || '';
    return campo.toLowerCase().includes(busqueda.toLowerCase());
  });

  const libro = librosFiltrados[indice];
  const formatFecha = (f) => { if (!f) return 'N/A'; const [y, m, d] = f.split('-'); return `${d}/${m}/${y}`; };

  return (
    <div className="biblioteca-container">
      <div className="header">
        <img src={logo} className="logo" alt="Chapter Data Logo" onClick={() => navigate('/menu')} style={{ cursor: 'pointer' }} />
        <h1 className="title">El registro perfecto para tu próxima gran historia</h1>
      </div>
      <h2 className="biblioteca-title">MI BIBLIOTECA</h2>
      <div className="buscador-biblioteca">
        <span>🔍</span>
        <input type="text" placeholder="Búsqueda" value={busqueda} onChange={(e) => { setBusqueda(e.target.value); setIndice(0); }} className="buscador-input" />
        <select value={filtro} onChange={(e) => { setFiltro(e.target.value); setIndice(0); }} className="filtro-select">
          {FILTROS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <div className="biblioteca-content">
        <div className="menu-actions">
          <button className="btn-menu" onClick={() => navigate('/addbook')}>Añadir libro</button>
          <button className="btn-menu" onClick={() => navigate('/historial')}>Consultar Historial</button>
          <button className="btn-menu" onClick={() => navigate('/estadisticas')}>Estadísticas</button>
        </div>
        <div className="biblioteca-center">
          {cargando && <p>Cargando...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!cargando && libro ? (
            <>
              {indice > 0 && <div className="flecha-anterior"><span onClick={() => setIndice(indice - 1)} className="flecha">« Anterior</span></div>}
              <div className="ficha-libro">
                <div className="ficha-row"><span className="ficha-label">TÍTULO</span><span className="ficha-valor">{libro.titulo}</span></div>
                <div className="ficha-row"><span className="ficha-label">AUTOR</span><span className="ficha-valor">{libro.autor}</span></div>
                <div className="ficha-row"><span className="ficha-label">ISBN</span><span className="ficha-valor">{libro.isbn || '—'}</span></div>
                <div className="ficha-row"><span className="ficha-label">FECHA LECTURA</span><span className="ficha-valor">{formatFecha(libro.fecha_lectura)}</span></div>
                <div className="ficha-row">
                  <span className="ficha-label">PUNTUACIÓN</span>
                  <div className="estrellas-readonly">
                    {[1,2,3,4,5].map((s) => <span key={s} className={`star ${s <= (libro.puntuacion || 0) ? 'filled' : ''}`}>★</span>)}
                  </div>
                </div>
                <div className="ficha-row ficha-row-resena"><span className="ficha-label">RESEÑA</span><div className="resena-box">{libro.resena || 'Sin reseña'}</div></div>
              </div>
              {indice < librosFiltrados.length - 1 && <div className="flecha-siguiente"><span onClick={() => setIndice(indice + 1)} className="flecha">Siguiente »</span></div>}
            </>
          ) : (!cargando && <p className="sin-resultados">No se encontraron libros.</p>)}
        </div>
        <div className="menu-profile">
          <div className="profile-card">
            <img src={userIcon} alt="Usuario" className="user-icon" onClick={() => navigate('/usuario')} style={{ cursor: 'pointer' }} />
            <p>Perfil de usuario</p>
            <span className="username">{usuario?.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Biblioteca;