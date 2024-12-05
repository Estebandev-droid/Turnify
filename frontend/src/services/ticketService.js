import axios from 'axios';

const API_URL = 'http://localhost:5001/api/tickets';

export const createTicket = async (ticketData) => {
  try {
    const response = await axios.post(API_URL, ticketData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el ticket');
  }
};
