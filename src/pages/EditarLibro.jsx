import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/logo.png';
import userIcon from '../assets/usuario.png';
import { getLibros, getGeneros, editarLibro, getUsuario } from '../api';
import './AddBook.css';

function EditarLibro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const usuario = getUsuario();

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [generos, setGeneros] = useState([]);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '', autor: '', id_genero: '', isbn: '', fecha_lectura: '', resena: ''
  });

  // Cargamos los datos del libro y los géneros al montar
  useEffect(() => {
    getGeneros().then(setGeneros).catch(() => setError('No se pudieron cargar los géneros.'));

    getLibros().then((libros) => {
      const libro = libros.find((l) => l.id === parseInt(id));
      if (libro) {
        setFormData({
          titulo: libro.titulo || '',
          autor: libro.autor || '',
          id_genero: libro.id_genero || '',
          isbn: libro.isbn || '',
          fecha_lectura: libro.fecha_lectura || '',
          resena: libro.resena || ''
        });
        setRating(libro.puntuacion || 0);
      }
    }).catch(() => setError('No se pudo cargar el libro.'));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setExito(''); setCargando(true);
    try {
      await editarLibro(parseInt(id), {
        titulo: formData.titulo,
        autor: formData.autor,
        id_genero: parseInt(formData.id_genero),
        isbn: formData.isbn || null,
        fecha_lectura: formData.fecha_lectura || null,
        puntuacion: rating || null,
        resena: formData.resena || null,
      });
      setExito('✅ Libro actualizado correctamente.');
      setTimeout(() => navigate('/historial'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="addbook-container">
      <div className="header">
        <img src={logo} className="logo" alt="Chapter Data Logo" onClick={() => navigate('/menu')} style={{ cursor: 'pointer' }} />
        <h1 className="title">El registro perfecto para tu próxima gran historia</h1>
      </div>
      <h2 className="addbook-title">EDITAR LIBRO</h2>
      <div className="addbook-content">
        <div className="menu-actions">
          <button className="btn-menu" onClick={() => navigate('/addbook')}>Añadir libro</button>
          <button className="btn-menu" onClick={() => navigate('/historial')}>Consultar Historial</button>
          <button className="btn-menu" onClick={() => navigate('/estadisticas')}>Estadísticas</button>
        </div>
        <form className="addbook-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>TÍTULO</label>
            <input type="text" name="titulo" onChange={handleChange} value={formData.titulo} required />
          </div>
          <div className="form-row">
            <label>AUTOR</label>
            <input type="text" name="autor" onChange={handleChange} value={formData.autor} required />
          </div>
          <div className="form-row">
            <label>GÉNERO</label>
            <select name="id_genero" onChange={handleChange} value={formData.id_genero} required
              style={{ flex: 1, padding: '8px 10px', border: '1px solid #002d55', backgroundColor: '#e8f0fe', borderRadius: '3px', fontSize: '0.95rem' }}>
              <option value="">Selecciona un género</option>
              {generos.map((g) => (
                <option key={g.id} value={g.id}>{g.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>ISBN</label>
            <input type="text" name="isbn" onChange={handleChange} value={formData.isbn} />
          </div>
          <div className="form-row">
            <label>FECHA LECTURA</label>
            <input type="date" name="fecha_lectura" onChange={handleChange} value={formData.fecha_lectura} />
          </div>
          <div className="form-row">
            <label>PUNTUACIÓN</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`star ${star <= (hovered || rating) ? 'filled' : ''}`}
                  onClick={() => setRating(star)} onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)}>★</span>
              ))}
            </div>
          </div>
          <div className="form-row form-row-resena">
            <label>RESEÑA</label>
            <textarea name="resena" onChange={handleChange} value={formData.resena} />
          </div>
          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
          {exito && <p style={{ color: 'green', fontSize: '0.9rem' }}>{exito}</p>}
          <button type="submit" className="btn-accept-book" disabled={cargando}>
            {cargando ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
        <div className="menu-profile">
          <div className="profile-card">
            <img src={userIcon} alt="Usuario" className="user-icon" onClick={() => navigate('/usuario')} style={{ cursor: 'pointer' }} />
            <p>Perfil de usuario</p>
            <span className="username">{usuario?.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarLibro;