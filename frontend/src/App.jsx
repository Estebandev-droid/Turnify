import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthFlow from './components/AuthFlow';
import Dashboard from './components/Dashboard/Dashboard';
import CreateTicketForm from './components/Ticket/CreateTicketForm';
import TicketList from './components/Ticket/TicketList';
import { useEffect, useState } from 'react';
import { getTickets } from './services/ticketService';

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data);
      } catch (error) {
        console.error('Error al obtener tickets:', error);
      }
    };
    fetchTickets();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthFlow />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-ticket" element={<CreateTicketForm />} />
        <Route path="/ticketlist" element={<TicketList tickets={tickets} />} />
      </Routes>
    </Router>
  );
}

export default App;
