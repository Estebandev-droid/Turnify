import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, ListGroup, Form, ProgressBar } from 'react-bootstrap';
import { FaTicketAlt, FaCheckCircle } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch tickets from the backend when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/tickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNextTicket = async (ticketId) => {
    try {
      // Update ticket status to "Atendido" in the backend
      const updatedTicket = { status: 'Atendido' };
      await axios.put(`http://localhost:5001/api/tickets/${ticketId}`, updatedTicket);
      
      // Update state locally to reflect changes
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === ticketId ? { ...ticket, status: 'Atendido' } : ticket
        )
      );
    } catch (error) {
      console.error('Error updating ticket status:', error);
    }
  };

  const data = {
    labels: ['Atendidos', 'Pendientes'],
    datasets: [
      {
        data: [2, 1],  // This will be dynamic based on the real ticket data
        backgroundColor: ['#4caf50', '#ff9800'],
        hoverOffset: 4,
      },
    ],
  };

  const attendedTickets = tickets.filter(ticket => ticket.status === 'Atendido');
  const pendingTickets = tickets.filter(ticket => ticket.status === 'Pendiente');
  const progress = (attendedTickets.length / tickets.length) * 100;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="shadow-sm rounded-md p-3">
        <Card.Body className="text-center">
          <h4 className="font-semibold text-sm mb-3 text-purple-700">Tickets Pendientes</h4>
          <Form.Control
            type="text"
            placeholder="Buscar ticket por título"
            className="mb-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="sm"
          />
          <ListGroup variant="flush" className="mb-3">
            {filteredTickets
              .filter(ticket => ticket.status === 'Pendiente')
              .map(ticket => (
                <ListGroup.Item key={ticket.id} className="flex justify-between items-center border-b py-2">
                  <div className="flex items-center">
                    <FaTicketAlt className="mr-2 text-xl text-indigo-600" />
                    <span>{ticket.title}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{ticket.time}</span>
                </ListGroup.Item>
              ))}
          </ListGroup>
          <Button
            onClick={() => handleNextTicket(filteredTickets[0]?.id)}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1 rounded-sm text-sm"
          >
            Siguiente Ticket
          </Button>
        </Card.Body>
      </Card>

      <Card className="shadow-sm rounded-md col-span-2 p-3">
        <Card.Body>
          <h5 className="font-semibold mb-3 text-center text-purple-700">Estadísticas</h5>
          <div className="flex justify-center mb-3" style={{ width: '120px', height: '120px' }}>
            <Doughnut
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top', labels: { font: { size: 10 } } } },
              }}
            />
          </div>
          <h6 className="text-center text-sm">Tickets Atendidos: {attendedTickets.length}</h6>
          <h6 className="text-center text-sm">Tickets Pendientes: {pendingTickets.length}</h6>
          <ProgressBar now={progress} label={`${Math.round(progress)}% Atendidos`} className="mt-2" />
        </Card.Body>
      </Card>

      <Card className="shadow-sm rounded-md p-3">
        <Card.Body className="text-center">
          <h4 className="font-semibold text-sm mb-3 text-purple-700">Tickets Atendidos</h4>
          <ListGroup variant="flush" className="mb-3">
            {tickets
              .filter(ticket => ticket.status === 'Atendido')
              .map(ticket => (
                <ListGroup.Item key={ticket.id} className="flex justify-between items-center border-b py-2">
                  <div className="flex items-center">
                    <FaCheckCircle className="mr-2 text-xl text-green-500" />
                    <span>{ticket.title}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{ticket.time}</span>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;
