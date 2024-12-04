const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor ingrese su nombre'],
    },
    email: {
      type: String,
      required: [true, 'Por favor ingrese su correo electrónico'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Por favor ingrese su contraseña'],
    },
  },
  { timestamps: true }
);

// Encriptar contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Comparar contraseñas
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
