import { useState } from 'react';
import './Login.css'; 

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
      <div className="login-card">
        <h1>Chapter Data</h1>
        <h2 className="login-title">Acceder</h2>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre de usuario o correo electrónico:</label>
            <input 
              type="text" 
              name="identifier" 
              onChange={handleChange} 
              value={formData.identifier}
            />
          </div>
          
          <div className="input-group">
            <label>Contraseña:</label>
            <input 
              type="password" 
              name="password" 
              onChange={handleChange} 
              value={formData.password}
            />
          </div>
          
          <button type="submit" className="btn-accept">Aceptar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;