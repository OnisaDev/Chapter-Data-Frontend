import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import userIcon from '../assets/usuario.png';
import './AddBook.css';

function AddBook() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    genero: '',
    usuario: '',
    isbn: '',
    fechaLectura: '',
    resena: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del libro:", { ...formData, puntuacion: rating });
    navigate('/menu');
  };

  return (
    <div className="addbook-container">
      {/* HEADER */}
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

      <h2 className="addbook-title">AÑADIR LIBRO</h2>

      <div className="addbook-content">
        {/* COLUMNA IZQUIERDA: botones */}
        <div className="menu-actions">
          <button className="btn-menu" onClick={() => navigate('/addbook')}>Añadir libro</button>
          <button className="btn-menu" onClick={() => navigate('/historial')}>Consultar Historial</button>
          <button className="btn-menu" onClick={() => navigate('/estadisticas')}>Estadísticas</button>
        </div>

        {/* CENTRO: formulario */}
        <form className="addbook-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>TÍTULO</label>
            <input type="text" name="titulo" placeholder="*Campo obligatorio" onChange={handleChange} value={formData.titulo} required />
          </div>

          <div className="form-row">
            <label>AUTOR</label>
            <input type="text" name="autor" placeholder="*Campo obligatorio" onChange={handleChange} value={formData.autor} required />
          </div>

          <div className="form-row">
            <label>GÉNERO</label>
            <input type="text" name="genero" placeholder="*Campo obligatorio" onChange={handleChange} value={formData.genero} required />
          </div>

          <div className="form-row">
            <label>USUARIO</label>
            <input type="text" name="usuario" placeholder="*Campo obligatorio" onChange={handleChange} value={formData.usuario} required />
          </div>

          <div className="form-row">
            <label>ISBN</label>
            <input type="text" name="isbn" onChange={handleChange} value={formData.isbn} />
          </div>

          <div className="form-row">
            <label>FECHA LECTURA</label>
            <input type="date" name="fechaLectura" onChange={handleChange} value={formData.fechaLectura} />
          </div>

          <div className="form-row">
            <label>PUNTUACIÓN</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hovered || rating) ? 'filled' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="form-row form-row-resena">
            <label>RESEÑA</label>
            <textarea name="resena" onChange={handleChange} value={formData.resena} />
          </div>

          <button type="submit" className="btn-accept-book">Aceptar</button>
        </form>

        {/* COLUMNA DERECHA: perfil */}
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

export default AddBook;