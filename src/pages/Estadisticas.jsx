import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import logo from '../assets/logo.png';
import userIcon from '../assets/usuario.png';
import './Estadisticas.css';

// Datos de prueba hasta conectar el backend
const datosMock = [
  { name: 'Fantasía', value: 10 },
  { name: 'Terror', value: 15 },
  { name: 'Romance', value: 20 },
  { name: 'Comedia', value: 25 },
  { name: 'Misterio', value: 30 },
];

const COLORES = ['#4caf50', '#f39c12', '#002d55', '#5dade2', '#85c1e9'];

function Estadisticas() {
  const navigate = useNavigate();

  return (
    <div className="estadisticas-container">
      {/* HEADER */}
      <div className="header">
        <img src={logo} className="logo" alt="Chapter Data Logo" />
        <h1 className="title">El registro perfecto para tu próxima gran historia</h1>
      </div>

      <h2 className="estadisticas-title">ESTADISTICAS</h2>

      <div className="estadisticas-content">
        {/* COLUMNA IZQUIERDA: botones */}
        <div className="menu-actions">
          <button className="btn-menu" onClick={() => navigate('/addbook')}>Añadir libro</button>
          <button className="btn-menu" onClick={() => navigate('/historial')}>Consultar Historial</button>
          <button className="btn-menu" onClick={() => navigate('/estadisticas')}>Estadísticas</button>
        </div>

        {/* CENTRO: gráfico */}
        <div className="estadisticas-center">
          <PieChart width={400} height={380}>
            <Pie
              data={datosMock}
              cx={200}
              cy={180}
              innerRadius={80}
              outerRadius={150}
              dataKey="value"
              label={({ value }) => value}
              labelLine={true}
            >
              {datosMock.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORES[index % COLORES.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} libros`, 'Cantidad']} />
            <Legend />
          </PieChart>
        </div>

        {/* COLUMNA DERECHA: perfil */}
        <div className="menu-profile">
          <div className="profile-card">
            <img src={userIcon} alt="Usuario" className="user-icon" />
            <p>Perfil de usuario</p>
            <span className="username">MCPT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estadisticas;