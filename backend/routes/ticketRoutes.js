const express = require('express');
const Ticket = require('../models/ticketModel');
const router = express.Router();

// Crear un nuevo ticket
router.post('/', async (req, res) => {
  try {
    const { title, status } = req.body;
    const ticket = new Ticket({ title, status });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el ticket' });
  }
});

// Obtener todos los tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tickets' });
  }
});

module.exports = router;
