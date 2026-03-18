import React from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/menu');
  };

  return (
    <div className="register-container">
      <header className="header">
        <img src={logo} alt="Chapter Data Logo" className="logo" />
        <h1 className="title">El registro perfecto para tu próxima gran historia</h1>
      </header>

      <div className="register-card">
        <h2 className="register-title">Crear cuenta</h2>
        
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre de usuario:</label>
            <input type="text" placeholder="Nombre de usuario" />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input type="email" placeholder="Correo electrónico" />
          </div>

          <div className="input-group">
            <label>Contraseña:</label>
            <input type="password" placeholder="Contraseña" />
          </div>

          <button type="submit" className="btn-accept">Aceptar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;