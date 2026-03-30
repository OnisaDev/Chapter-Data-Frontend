import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import logo from '../assets/logo.png';
import userIcon from '../assets/usuario.png';
import { getEstadisticas, getUsuario } from '../api';
import './Estadisticas.css';

const COLORES = ['#4caf50', '#f39c12', '#002d55', '#5dade2', '#85c1e9', '#e74c3c', '#9b59b6'];

function Estadisticas() {
  const navigate = useNavigate();
  const usuario = getUsuario();
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getEstadisticas()
      .then((res) => setDatos(res.map((item) => ({ name: item.genero, value: item.cantidad }))))
      .catch(() => setError('No se pudieron cargar las estadísticas.'))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="estadisticas-container">
      <div className="header">
        <img src={logo} className="logo" alt="Chapter Data Logo" onClick={() => navigate('/menu')} style={{ cursor: 'pointer' }} />
        <h1 className="title">El registro perfecto para tu próxima gran historia</h1>
      </div>
      <h2 className="estadisticas-title">ESTADÍSTICAS</h2>
      <div className="estadisticas-content">
        <div className="menu-actions">
          <button className="btn-menu" onClick={() => navigate('/addbook')}>Añadir libro</button>
          <button className="btn-menu" onClick={() => navigate('/historial')}>Consultar Historial</button>
          <button className="btn-menu" onClick={() => navigate('/estadisticas')}>Estadísticas</button>
        </div>
        <div className="estadisticas-center">
          {cargando && <p>Cargando estadísticas...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!cargando && datos.length === 0 && !error && <p style={{ color: '#888', fontStyle: 'italic' }}>Aún no hay libros para mostrar estadísticas.</p>}
          {!cargando && datos.length > 0 && (
            <PieChart width={400} height={380}>
              <Pie data={datos} cx={200} cy={180} innerRadius={80} outerRadius={150} dataKey="value" label={({ value }) => value} labelLine={true}>
                {datos.map((_, index) => <Cell key={`cell-${index}`} fill={COLORES[index % COLORES.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => [`${value} libros`, 'Cantidad']} />
              <Legend />
            </PieChart>
          )}
        </div>
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

export default Estadisticas;