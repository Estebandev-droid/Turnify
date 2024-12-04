import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthFlow = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'forgot'
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (currentView === 'register') {
        await authService.register(formData);
        setCurrentView('login');
      } else if (currentView === 'login') {
        await authService.login(formData);
        navigate('/dashboard');
      } else if (currentView === 'forgot') {
        // Aquí podrías implementar lógica para enviar un correo de recuperación
        alert('Se ha enviado un correo de recuperación (Simulación)');
        setCurrentView('login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error en la operación');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-6 text-center">
          {currentView === 'login' && 'Iniciar Sesión'}
          {currentView === 'register' && 'Registro'}
          {currentView === 'forgot' && 'Recuperar Contraseña'}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Campos comunes */}
        {(currentView === 'register' || currentView === 'login') && (
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )}

        {/* Contraseña */}
        {currentView !== 'forgot' && (
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required={currentView !== 'forgot'}
            />
          </div>
        )}

        {/* Nombre (solo en registro) */}
        {currentView === 'register' && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          {currentView === 'login' && 'Iniciar Sesión'}
          {currentView === 'register' && 'Registrarse'}
          {currentView === 'forgot' && 'Recuperar Contraseña'}
        </button>

        {/* Cambiar de vista */}
        <div className="mt-4 text-center">
          {currentView === 'login' && (
            <>
              <p className="text-sm">
                ¿No tienes una cuenta?{' '}
                <span
                  onClick={() => setCurrentView('register')}
                  className="text-indigo-500 cursor-pointer hover:underline"
                >
                  Regístrate
                </span>
              </p>
              <p className="text-sm mt-2">
                ¿Olvidaste tu contraseña?{' '}
                <span
                  onClick={() => setCurrentView('forgot')}
                  className="text-indigo-500 cursor-pointer hover:underline"
                >
                  Recuperar
                </span>
              </p>
            </>
          )}
          {currentView === 'register' && (
            <p className="text-sm">
              ¿Ya tienes una cuenta?{' '}
              <span
                onClick={() => setCurrentView('login')}
                className="text-indigo-500 cursor-pointer hover:underline"
              >
                Inicia Sesión
              </span>
            </p>
          )}
          {currentView === 'forgot' && (
            <p className="text-sm">
              ¿Recordaste tu contraseña?{' '}
              <span
                onClick={() => setCurrentView('login')}
                className="text-indigo-500 cursor-pointer hover:underline"
              >
                Inicia Sesión
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthFlow;
