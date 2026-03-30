import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import userIcon from '../assets/usuario.png';
import { getResumenLibros, eliminarLibro, getUsuario } from '../api';
import './Historial.css';

function Historial() {
  const navigate = useNavigate();
  const usuario = getUsuario();
  const [libros, setLibros] = useState([]);
  const [expandido, setExpandido] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarLibros = () => {
    setCargando(true);
    getResumenLibros()
      .then(setLibros)
      .catch(() => setError('No se pudieron cargar los libros.'))
      .finally(() => setCargando(false));
  };

  useEffect(() => { cargarLibros(); }, []);

  const librosFiltrados = libros.filter((l) =>
    l.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    l.autor.toLowerCase().includes(busqueda.toLowerCase())
  );
  const librosVisibles = expandido ? librosFiltrados : librosFiltrados.slice(0, 5);

  const handleSeleccionar = (libro) => {
    setSeleccionado(seleccionado?.id === libro.id ? null : libro);
  };

  const handleEliminar = () => {
    if (!seleccionado) return alert('Selecciona un libro primero');
    setConfirmarEliminar(true);
  };

  const handleConfirmarEliminar = async () => {
    try {
      await eliminarLibro(seleccionado.id);
      setConfirmarEliminar(false);
      setSeleccionado(null);
      cargarLibros();
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  };

  return (
    <div className="historial-container">
      {confirmarEliminar && (
        <div className="modal-overlay">
          <div className="modal-card">
            <p>¿Estás seguro de que quieres eliminar <strong>{seleccionado.titulo}</strong>?</p>
            <div className="modal-botones">
              <button className="btn-accept" onClick={handleConfirmarEliminar}>Sí, eliminar</button>
              <button className="btn-cancelar" onClick={() => setConfirmarEliminar(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      <div className="header">
        <img src={logo} className="logo" alt="Chapter Data Logo" onClick={() => navigate('/menu')} style={{ cursor: 'pointer' }} />
        <h1 className="title">El registro perfecto para tu próxima gran historia</h1>
      </div>
      <h2 className="historial-title">HISTORIAL DE REGISTROS</h2>
      <div className="historial-content">
        <div className="menu-actions">
          <button className="btn-menu" onClick={() => navigate('/addbook')}>Añadir libro</button>
          <button className="btn-menu" onClick={() => navigate('/historial')}>Consultar Historial</button>
          <button className="btn-menu" onClick={() => navigate('/estadisticas')}>Estadísticas</button>
        </div>
        <div className="historial-center">
          <p className="ultimas-label">Últimas subidas:</p>
          <div className="libros-lista">
            {cargando && <p style={{ padding: '10px', color: '#555' }}>Cargando...</p>}
            {error && <p style={{ padding: '10px', color: 'red' }}>{error}</p>}
            {!cargando && librosVisibles.map((libro) => (
              <div key={libro.id} className={`libro-item ${seleccionado?.id === libro.id ? 'libro-seleccionado' : ''}`} onClick={() => handleSeleccionar(libro)}>
                {libro.titulo} – de {libro.autor}
              </div>
            ))}
            {!cargando && librosFiltrados.length > 5 && (
              <div className="expand-btn" onClick={() => setExpandido(!expandido)}>{expandido ? '▲' : '···'}</div>
            )}
            {!cargando && librosFiltrados.length === 0 && !error && (
              <p style={{ padding: '10px', color: '#888', fontStyle: 'italic' }}>No hay libros.</p>
            )}
          </div>
        </div>
        <div className="historial-right">
          <div className="historial-actions">
            <div className="buscador">
              <span>🔍</span>
              <input type="text" placeholder="Búsqueda" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="buscador-input" />
            </div>
            <div className="acciones">
              <div className="accion-item" onClick={() => navigate('/biblioteca')}>
                <span className="accion-icon">🖼️</span><span>Visualizar Biblioteca</span>
              </div>
              <div className="accion-item" onClick={() => { if (!seleccionado) return alert('Selecciona un libro primero'); navigate(`/editar/${seleccionado.id}`); }}>
                <span className="accion-icon">📝</span><span>Editar registro</span>
              </div>
              <div className="accion-item" onClick={handleEliminar}>
                <span className="accion-icon">🗑️</span><span>Eliminar registro</span>
              </div>
            </div>
          </div>
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

export default Historial;