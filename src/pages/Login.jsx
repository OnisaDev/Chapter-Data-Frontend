import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import './Login.css';
import logo from '../assets/logo.png';

function Login() {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      await login(formData.identifier, formData.password);
      navigate('/menu');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <img src={logo} className="logo" alt="Chapter Data Logo" />
        <h1 className="title">El registro perfecto para tu próxima gran historia</h1>
      </div>
      <div className="login-card">
        <h2 className="login-title">Acceder</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-row">
            <label className="input-label">Nombre de usuario o correo electrónico:</label>
            <input type="text" name="identifier" onChange={handleChange} value={formData.identifier} placeholder="Nombre de usuario o email" required />
          </div>
          <div className="input-row">
            <label className="input-label">Contraseña:</label>
            <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Contraseña" required />
          </div>
          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
          <button type="submit" className="btn-accept" disabled={cargando}>
            {cargando ? 'Entrando...' : 'Aceptar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;