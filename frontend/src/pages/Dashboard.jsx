import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatisticsCard from '../components/StatisticsCard';
import CreateTicketForm from '../components/CreateTicketForm';
import TicketList from '../components/Ticket/TicketList'; // Nuevo componente

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [tickets, setTickets] = useState([]); // Estado para tickets
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const userResponse = await axios.get('http://localhost:5000/api/users/me', config);
        const tasksResponse = await axios.get('http://localhost:5000/api/tasks', config);
        const ticketsResponse = await axios.get('http://localhost:5001/api/tickets', config);

        setUser(userResponse.data);
        setTasks(tasksResponse.data);
        setTickets(ticketsResponse.data); // Cargar tickets
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar el Dashboard:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNewTicket = (newTicket) => {
    setTickets((prevTickets) => [...prevTickets, newTicket]); // Actualizar estado con nuevo ticket
  };

  if (loading) {
    return <div className="text-white text-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">¡Hola, {user?.name || 'Usuario'}! 👋</h1>

      <CreateTicketForm onTicketCreated={handleNewTicket} /> {/* Crear tickets */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatisticsCard
          title="Tareas Pendientes"
          value={tasks.filter((task) => task.status === 'pendiente').length}
          color="bg-purple-700"
        />
        <StatisticsCard
          title="Tareas en Progreso"
          value={tasks.filter((task) => task.status === 'en progreso').length}
          color="bg-blue-700"
        />
        <StatisticsCard
          title="Tareas Completadas"
          value={tasks.filter((task) => task.status === 'completada').length}
          color="bg-green-700"
        />
      </div>

      <TaskList tasks={tasks} /> {/* Mostrar tareas */}

      <h2 className="text-2xl font-bold mt-8 mb-4">Tickets</h2>
      <TicketList tickets={tickets} /> {/* Mostrar tickets */}
    </div>
  );
};

export default Dashboard;
