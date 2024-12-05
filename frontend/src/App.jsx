import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthFlow from './components/AuthFlow'; // Ruta para la autenticación
import Dashboard from './components/Dashboard/Dashboard'; // Ruta para el panel principal
import CreateTicketForm from './components/Ticket/CreateTicketForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthFlow />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-ticket" element={<CreateTicketForm />} />
      </Routes>
    </Router>
  );
}

export default App;

