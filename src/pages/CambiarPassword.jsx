import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { cambiarPassword } from '../api';
import './Register.css';

function CambiarPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password_actual: '', nueva_password: '', confirmar: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setExito('');

    if (formData.nueva_password !== formData.confirmar) {
      return setError('Las contraseñas nuevas no coinciden.');
    }

    setCargando(true);
    try {
      await cambiarPassword({
        password_actual: formData.password_actual,
        nueva_password: formData.nueva_password
      });
      setExito('✅ Contraseña cambiada correctamente.');
      setTimeout(() => navigate('/usuario'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="register-container">
      <header className="header">
        <img src={logo} alt="Chapter Data Logo" className="logo" onClick={() => navigate('/usuario')} style={{ cursor: 'pointer' }} />
        <h1 className="title">El registro perfecto para tu próxima gran historia</h1>
      </header>
      <div className="register-card">
        <h2 className="register-title">Cambiar contraseña</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Contraseña actual:</label>
            <input type="password" name="password_actual" value={formData.password_actual} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Nueva contraseña:</label>
            <input type="password" name="nueva_password" value={formData.nueva_password} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Confirmar nueva contraseña:</label>
            <input type="password" name="confirmar" value={formData.confirmar} onChange={handleChange} required />
          </div>
          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
          {exito && <p style={{ color: 'green', fontSize: '0.9rem' }}>{exito}</p>}
          <button type="submit" className="btn-accept" disabled={cargando}>
            {cargando ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CambiarPassword;