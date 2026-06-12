<!-- Chapter-Data-Frontend — README -->
<div align="center">

# ✦ Chapter Data · Frontend ✦
### React · Vite · React Router · TFG DAM

![React](https://img.shields.io/badge/React-ff9f43?style=flat-square&logo=react&logoColor=0f0a0d)
![Vite](https://img.shields.io/badge/Vite-ff6b9d?style=flat-square&logo=vite&logoColor=0f0a0d)
![JavaScript](https://img.shields.io/badge/JavaScript-ffe066?style=flat-square&logo=javascript&logoColor=0f0a0d)
![React Router](https://img.shields.io/badge/React_Router-cc8870?style=flat-square)
![Recharts](https://img.shields.io/badge/Recharts-f97316?style=flat-square)
![DAM](https://img.shields.io/badge/TFG-CFGS_DAM-ff9f43?style=flat-square)

> Parte del proyecto [Chapter Data](https://github.com/OnisaDev/Chapter-Data) · Ver también: [Backend](https://github.com/OnisaDev/Chapter-Data) · [BBDD](https://github.com/OnisaDev/Chapter-Data-BBDD)

</div>

---

## 📋 Descripción

Frontend de **Chapter Data**, aplicación web para el registro y seguimiento personal de lecturas. Desarrollado con React + Vite como Trabajo de Fin de Grado del CFGS DAM.

---

## 🗂️ Páginas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Landing | Presentación de la app |
| `/register` | Register | Registro de nuevo usuario |
| `/login` | Login | Inicio de sesión |
| `/menu` | MainMenu | Menú principal |
| `/addbook` | AddBook | Añadir nuevo libro |
| `/historial` | Historial | Historial de lecturas |
| `/biblioteca` | Biblioteca | Biblioteca personal |
| `/estadisticas` | Estadisticas | Gráfico PieChart por géneros |
| `/usuario` | Usuario | Perfil del usuario |
| `/editar/:id` | EditarLibro | Edición de libro |
| `/editar-usuario` | EditarUsuario | Edición de perfil |
| `/cambiar-password` | CambiarPassword | Cambio de contraseña |

---

## ✨ Características técnicas

- 🔀 **React Router** — navegación SPA con rutas declarativas
- 📡 **`api.js` centralizado** — todas las llamadas al backend en un único módulo
- 💾 **Sesión en localStorage** — usuario persistido entre recargas
- 📊 **Recharts PieChart** — estadísticas de lectura por género literario
- 🎨 **CSS por componente** — estilos encapsulados sin frameworks externos
- 🔐 **`id_usuario` como query param** — todas las rutas autenticadas lo incluyen automáticamente

---

## 🛠️ Stack

![React](https://img.shields.io/badge/React-ff9f43?style=flat-square&logo=react&logoColor=0f0a0d)
![Vite](https://img.shields.io/badge/Vite-ff6b9d?style=flat-square&logo=vite&logoColor=0f0a0d)
![JavaScript](https://img.shields.io/badge/JavaScript-ffe066?style=flat-square&logo=javascript&logoColor=0f0a0d)
![Recharts](https://img.shields.io/badge/Recharts-cc8870?style=flat-square)
![React Router](https://img.shields.io/badge/React_Router-f97316?style=flat-square)

---

## 🚀 Instalación

```bash
npm install
npm run dev
```

> Requiere el backend corriendo en `http://localhost:8000`

---

<div align="center">
<sub>Trabajo de Fin de Grado · CFGS DAM · CESUR Málaga ☕</sub>
</div>
