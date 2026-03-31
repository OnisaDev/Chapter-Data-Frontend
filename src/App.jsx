import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import MainMenu from './pages/MainMenu';
import AddBook from './pages/AddBook';
import Historial from './pages/Historial';
import Biblioteca from './pages/Biblioteca';
import Estadisticas from './pages/Estadisticas';
import Usuario from './pages/Usuario';
import EditarLibro from './pages/EditarLibro';
import EditarUsuario from './pages/EditarUsuario';
import CambiarPassword from './pages/CambiarPassword';

function App() {
  return (
    <Router>
     <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/editar/:id" element={<EditarLibro />} />
        <Route path="/editar-usuario" element={<EditarUsuario />} />
        <Route path="/cambiar-password" element={<CambiarPassword />} />
     </Routes>
    </Router>
  );
}

export default App;

