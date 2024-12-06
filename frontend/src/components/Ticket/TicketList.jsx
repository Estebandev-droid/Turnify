import React, { useState, useEffect } from 'react';

const TicketList = ({ tickets = [] }) => {
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let filtered = tickets;

    if (priorityFilter) {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(ticket => ticket.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredTickets(filtered);
  }, [priorityFilter, statusFilter, searchQuery, tickets]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full mb-4"
        />
        <div className="flex gap-4 mb-4">
          <select
            className="p-2 border border-gray-300 rounded-lg"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">Filtrar por prioridad</option>
            <option value="alta">Alta</option>
            <option value="normal">Normal</option>
            <option value="baja">Baja</option>
          </select>
          <select
            className="p-2 border border-gray-300 rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Filtrar por estado</option>
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="resuelto">Resuelto</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-gray-50 shadow-md rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="py-2 px-4">Título</th>
              <th className="py-2 px-4">Descripción</th>
              <th className="py-2 px-4">Prioridad</th>
              <th className="py-2 px-4">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket._id} className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-800">{ticket.title}</td>
                <td className="py-2 px-4 text-gray-600">{ticket.description}</td>
                <td className="py-2 px-4">
                  <span className={`p-2 rounded-full ${ticket.priority === 'alta' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <span className={`p-2 rounded-full ${ticket.status === 'resuelto' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketList;
