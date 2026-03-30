import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import userIcon from '../assets/usuario.png';
import './Historial.css';

// Datos de prueba hasta conectar el backend
const librosMock = [
  { id: 1, titulo: 'La anomalía', autor: 'Hervé Le Tellier' },
  { id: 2, titulo: 'La vida invisible de Addie LaRue', autor: 'V.E. Schwab' },
  { id: 3, titulo: 'Donde cantan las langostas', autor: 'Delia Owens' },
  { id: 4, titulo: 'El infinito en un junco', autor: 'Irene Vallejo' },
  { id: 5, titulo: 'Los siete maridos de Evelyn Hugo', autor: 'Taylor Jenkins Reid' },
  { id: 6, titulo: 'Circe', autor: 'Madeline Miller' },
  { id: 7, titulo: 'El nombre del viento', autor: 'Patrick Rothfuss' },
];

function Historial() {
  const navigate = useNavigate();
  const [expandido, setExpandido] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  const librosVisibles = expandido ? librosMock : librosMock.slice(0, 5);

  const handleSeleccionar = (libro) => {
    setSeleccionado(seleccionado?.id === libro.id ? null : libro);
  };

  const handleEditar = () => {
    if (!seleccionado) return alert('Selecciona un libro primero');
    navigate(`/editar/${seleccionado.id}`);
  };

  const handleEliminar = () => {
    if (!seleccionado) return alert('Selecciona un libro primero');
    console.log('Eliminar libro con ID:', seleccionado.id);
    // Aquí irá la llamada al backend
  };

  return (
    <div className="historial-container">
      {/* HEADER */}
      <div className="header">
        <img src={logo} className="logo" alt="Chapter Data Logo" />
        <h1 className="title">El registro perfecto para tu próxima gran historia</h1>
      </div>

      <h2 className="historial-title">HISTORIAL DE REGISTROS</h2>

      <div className="historial-content">
        {/* COLUMNA IZQUIERDA: botones */}
        <div className="menu-actions">
          <button className="btn-menu" onClick={() => navigate('/addbook')}>Añadir libro</button>
          <button className="btn-menu" onClick={() => navigate('/historial')}>Consultar Historial</button>
          <button className="btn-menu" onClick={() => navigate('/estadisticas')}>Estadísticas</button>
        </div>

        {/* CENTRO: lista de libros */}
        <div className="historial-center">
          <p className="ultimas-label">Últimas subidas:</p>
          <div className="libros-lista">
            {librosVisibles.map((libro) => (
              <div
                key={libro.id}
                className={`libro-item ${seleccionado?.id === libro.id ? 'libro-seleccionado' : ''}`}
                onClick={() => handleSeleccionar(libro)}
              >
                {libro.titulo} – de {libro.autor}
              </div>
            ))}
            <div className="expand-btn" onClick={() => setExpandido(!expandido)}>
              {expandido ? '▲' : '···'}
            </div>
          </div>
        </div>

        {/* DERECHA: buscador + acciones + perfil */}
        <div className="historial-right">
          {/* Buscador */}
          <div className="buscador">
            <span className="lupa">🔍</span>
            <input
              type="text"
              placeholder="Búsqueda"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="buscador-input"
            />
          </div>

          {/* Acciones */}
          <div className="acciones">
            <div className="accion-item" onClick={() => navigate('/biblioteca')}>
              <span className="accion-icon">🖼️</span>
              <span>Visualizar Biblioteca</span>
            </div>
            <div className="accion-item" onClick={handleEditar}>
              <span className="accion-icon">📝</span>
              <span>Editar registro</span>
            </div>
            <div className="accion-item" onClick={handleEliminar}>
              <span className="accion-icon">🗑️</span>
              <span>Eliminar registro</span>
            </div>
          </div>

          {/* Perfil */}
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

export default Historial;