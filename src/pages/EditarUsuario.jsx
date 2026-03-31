import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import userIcon from '../assets/usuario.png';
import { editarUsuario, getUsuario } from '../api';
import './Register.css';

function EditarUsuario() {
  const navigate = useNavigate();
  const usuario = getUsuario();

  const [formData, setFormData] = useState({
    nuevo_username: usuario?.username || '',
    nuevo_email: usuario?.email || ''
  });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setExito(''); setCargando(true);
    try {
      await editarUsuario(formData);
      // Actualizamos el localStorage con los nuevos datos
      const usuarioActualizado = { ...usuario, username: formData.nuevo_username, email: formData.nuevo_email };
      localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
      setExito('✅ Información actualizada correctamente.');
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
        <h2 className="register-title">Editar información</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre de usuario:</label>
            <input type="text" name="nuevo_username" value={formData.nuevo_username} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" name="nuevo_email" value={formData.nuevo_email} onChange={handleChange} required />
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

export default EditarUsuario;