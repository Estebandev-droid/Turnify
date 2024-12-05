import React, { useState } from 'react';
import { FaExclamationCircle, FaCheckCircle, FaPen } from 'react-icons/fa';
import { createTicket } from '../../services/ticketService';

const CreateTicketForm = ({ onTicketCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('normal');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTicket = { title, description, priority };
      await createTicket(newTicket); // Crear el ticket en el backend
      onTicketCreated(newTicket); // Pasar el ticket creado al Dashboard
      setTitle('');
      setDescription('');
      setPriority('normal');
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError('Error al crear el ticket');
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white/20 backdrop-blur-lg rounded-xl mt-8 shadow-2xl">
      <h3 className="text-3xl font-bold text-center mb-6 text-purple-600">Crear Ticket</h3>

      {error && (
        <div className="flex items-center mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
          <FaExclamationCircle className="mr-2" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-center mb-4 p-3 bg-green-100 text-green-600 rounded-lg">
          <FaCheckCircle className="mr-2" />
          <span>¡Ticket creado exitosamente!</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="formTitle" className="text-lg text-purple-700 font-semibold">
            <FaPen className="inline-block mr-2" />
            Título
          </label>
          <input
            type="text"
            id="formTitle"
            placeholder="Ingresa el título del ticket"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="formDescription" className="text-lg text-purple-700 font-semibold">
            Descripción
          </label>
          <textarea
            id="formDescription"
            rows="4"
            placeholder="Describe el problema o solicitud"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="formPriority" className="text-lg text-purple-700 font-semibold">
            Prioridad
          </label>
          <select
            id="formPriority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-purple-500"
          >
            <option value="normal">Normal</option>
            <option value="alta">Alta</option>
            <option value="baja">Baja</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition ease-in-out duration-300"
        >
          Crear Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicketForm;
