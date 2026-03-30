import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import userIcon from '../assets/usuario.png';
import { logout, eliminarCuenta, getUsuario } from '../api';
import './Usuario.css';

function Usuario() {
  const navigate = useNavigate();
  const usuario = getUsuario();
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);

  const handleConfirmarEliminar = async () => {
    try {
      await eliminarCuenta();
      navigate('/');
    } catch (err) {
      alert('Error al eliminar la cuenta: ' + err.message);
    }
  };

  const handleCerrarSesion = async () => {
    try { await logout(); } catch { localStorage.removeItem('usuario'); }
    navigate('/');
  };

  return (
    <div className="usuario-container">
      {confirmarEliminar && (
        <div className="modal-overlay">
          <div className="modal-card">
            <p>¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.</p>
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
      <h2 className="usuario-title">PERFIL DE USUARIO</h2>
      <div className="usuario-content">
        <div className="menu-actions">
          <button className="btn-menu" onClick={() => navigate('/addbook')}>Añadir libro</button>
          <button className="btn-menu" onClick={() => navigate('/historial')}>Consultar Historial</button>
          <button className="btn-menu" onClick={() => navigate('/estadisticas')}>Estadísticas</button>
        </div>
        <div className="usuario-center">
          <div className="usuario-card">
            <button className="btn-usuario">Editar información</button>
            <button className="btn-usuario">Editar imagen de perfil</button>
            <button className="btn-usuario">Cambio de contraseña</button>
            <button className="btn-usuario btn-eliminar" onClick={() => setConfirmarEliminar(true)}>Eliminar cuenta</button>
          </div>
          <div className="cerrar-sesion" onClick={handleCerrarSesion}>
            <span className="power-icon">⏻</span>
            <span>Cerrar sesión</span>
          </div>
        </div>
        <div className="menu-profile">
          <div className="profile-card">
            <img src={userIcon} alt="Usuario" className="user-icon" style={{ cursor: 'default' }} />
            <p>Perfil de usuario</p>
            <span className="username">{usuario?.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usuario;