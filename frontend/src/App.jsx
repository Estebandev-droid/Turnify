import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AuthFlow = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      <motion.div
        className="card w-80 sm:w-96"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          {isRegister ? 'Registro' : 'Iniciar Sesión'}
        </h2>
        <form className="flex flex-col gap-4">
          {isRegister && (
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Nombre"
                className="input-field pl-12"
              />
            </div>
          )}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Correo Electrónico"
              className="input-field pl-12"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              className="input-field pl-12 pr-10"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {!isRegister && (
            <div className="text-right">
              <span className="text-link">¿Olvidaste tu contraseña?</span>
            </div>
          )}
          <button className="btn-primary">
            {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>
        <p className="text-sm text-gray-300 mt-4">
          {isRegister ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}{' '}
          <span className="text-link" onClick={toggleForm}>
            {isRegister ? 'Iniciar Sesión' : 'Regístrate'}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthFlow;
