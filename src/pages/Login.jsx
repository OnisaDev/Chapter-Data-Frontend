import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import logo from '../assets/logo.png'; 

function Login() {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos para enviar al backend:", formData);
    navigate('/menu');
  };

  return (
    <div className="login-container">
      {/* SECCIÓN DEL BANNER SUPERIOR */}
      <div className="header">
        <img src={logo} className="logo" alt="Chapter Data Logo" />
        <h1 className="title">El registro perfecto para tu próxima gran historia</h1>
      </div>

      {/* SECCIÓN DE LA TARJETA BLANCA */}
      <div className="login-card">
        <h2 className="login-title">Acceder</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-row">
            <label className="input-label">Nombre de usuario o correo electrónico:</label>
            <input 
              type="text" 
              name="identifier" 
              onChange={handleChange} 
              value={formData.identifier}
              placeholder="Nombre de usuario o email"
            />
          </div>
          
          <div className="input-row">
            <label className="input-label">Contraseña:</label>
            <input 
              type="password" 
              name="password" 
              onChange={handleChange} 
              value={formData.password}
              placeholder="Contraseña"
            />
          </div>
          
          <button type="submit" className="btn-accept">Aceptar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;