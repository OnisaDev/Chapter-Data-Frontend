import React from 'react';
import './MainMenu.css';
import logo from '../assets/logo.png';
import bookIllustration from '../assets/LIBROS.png';
import userIcon from '../assets/usuario.png';
import { useNavigate } from 'react-router-dom';

function MainMenu() {
  const navigate = useNavigate();
  return (
    <div className="menu-container">
      <div className="header">
        <img
          src={logo}
          className="logo"
          alt="Chapter Data Logo"
          onClick={() => navigate('/menu')}
          style={{ cursor: 'pointer' }}
        />
        <h1 className="title">El registro perfecto para tu próxima gran historia</h1>
      </div>

      <h2 className="menu-title">MENU PRINCIPAL</h2>

      <div className="menu-content">
        {/* Columna Izquierda: Acciones */}
        <div className="menu-actions">
          <button className="btn-menu" onClick={() => navigate('/addbook')}>Añadir libro</button>
          <button className="btn-menu" onClick={() => navigate('/historial')}>Consultar Historial</button>
          <button className="btn-menu" onClick={() => navigate('/estadisticas')}>Estadísticas</button>
        </div>

        {/* Centro: Ilustración */}
        <div className="menu-illustration">
          <img src={bookIllustration} alt="Libros" />
        </div>

        {/* Derecha: Perfil */}
        <div className="menu-profile">
          <div className="profile-card">
            <img
              src={userIcon}
              alt="Usuario"
              className="user-icon"
              onClick={() => navigate('/usuario')}
              style={{ cursor: 'pointer' }}
            />
            <p>Perfil de usuario</p>
            <span className="username">MCPT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;