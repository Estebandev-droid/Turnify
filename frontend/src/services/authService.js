const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Importar rutas de usuario

// Configuración inicial
dotenv.config();
const app = express();

// Middleware CORS con manejo de preflight
app.use(cors({
  origin: 'http://localhost:5173', // Permitir solicitudes desde el frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  credentials: true, // Permitir cookies y credenciales
}));

// Manejo explícito de preflight
app.options('*', cors()); // Responde a las solicitudes preflight

app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Error conectando a MongoDB:', err));

// Rutas iniciales
app.get('/', (req, res) => {
  res.send('Turnify Backend en funcionamiento');
});

// Rutas de API
app.use('/api/users', userRoutes); // Usar las rutas de usuario

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en puerto ${PORT}`));
