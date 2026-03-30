import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { registrar } from '../api';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      await registrar(formData.username, formData.email, formData.password);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
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
            <input type="text" name="username" placeholder="Nombre de usuario" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Contraseña:</label>
            <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
          </div>
          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
          <button type="submit" className="btn-accept" disabled={cargando}>
            {cargando ? 'Registrando...' : 'Aceptar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;