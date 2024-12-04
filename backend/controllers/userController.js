const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, username } = req.body;

  // Validar campos requeridos
  if (!name || !email || !password || !username) {
    res.status(400);
    throw new Error('Por favor completa todos los campos');
  }

  // Verificar si el email ya está registrado
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('El usuario ya existe');
  }

  // Verificar si el nombre de usuario ya está en uso
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400);
    throw new Error('El nombre de usuario ya está en uso');
  }

  // Crear nuevo usuario
  const user = await User.create({ name, email, password, username });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Datos de usuario inválidos');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Por favor ingresa el correo y la contraseña');
  }

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username, // Incluye username si es necesario
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Credenciales inválidas');
  }
});

module.exports = { registerUser, loginUser };
