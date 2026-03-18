import { useState } from 'react';
import './Login.css'; 
// Asegúrate de que la ruta a tu logo sea la correcta
import logo from '../assets/logo.png'; 

function Login() {
  const [formData, setFormData] = useState({ identifier: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos para enviar al backend:", formData);
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
        <div className="login-title-wrapper">
           <h2 className="login-title">Acceder</h2>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-row">
            <label className="input-label">Nombre de usuario o correo electrónico:</label>
            <input 
              type="text" 
              name="identifier" 
              className="login-input"
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
              className="login-input"
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

