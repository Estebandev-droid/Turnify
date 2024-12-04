const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'Por favor ingrese la fecha del turno'],
    },
    time: {
      type: String,
      required: [true, 'Por favor ingrese la hora del turno'],
    },
    status: {
      type: String,
      enum: ['Pendiente', 'Confirmado', 'Cancelado'],
      default: 'Pendiente',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
