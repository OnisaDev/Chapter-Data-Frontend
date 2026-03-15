import './App.css';
import logo from './assets/logo.png'; // Asegúrate de que la ruta y nombre coincidan

function App() {
  return (
    <div className="landing-container">
      {/* Encabezado con Logo y Título */}
      <header className="header">
        <img src={logo} alt="Chapter Data Logo" className="logo" />
        <h1 className="title">El registro perfecto para tu próxima gran historia</h1>
      </header>

      {/* Sección de Botones */}
      <div className="button-section">
        
        <div className="button-group">
          <p>Únete a nosotros:</p>
          <button className="btn-yellow">Crear cuenta</button>
        </div>

        <div className="button-group">
          <p>¿Ya tienes una cuenta?</p>
          <button className="btn-yellow">Acceder</button>
        </div>

      </div>
    </div>
  );
}

export default App;