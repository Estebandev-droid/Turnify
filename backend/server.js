const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes'); // Importa las rutas de tickets
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',  // Asegúrate que este sea el puerto de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.options('*', cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes); // Añadir las rutas de tickets

app.get('/', (req, res) => {
  res.send('Turnify Backend en funcionamiento');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Servidor ejecutándose en puerto ${PORT}`));
