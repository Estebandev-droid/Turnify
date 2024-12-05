import { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir después del login

const AuthFlow = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Nombre para el registro
  const [error, setError] = useState(''); // Para mostrar errores de autenticación
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga
  const navigate = useNavigate(); // Función para redirigir al Dashboard

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setError(''); // Limpiar error al cambiar de formulario
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Simula el proceso de login o registro
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple del formulario
    if (!email || !password || (isRegister && !name)) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setIsLoading(true); // Muestra el estado de carga

    // Aquí es donde debes integrar las solicitudes de API para login o registro.
    try {
      if (isRegister) {
        // Lógica de registro (puedes hacer la solicitud HTTP aquí)
        console.log('Usuario registrado:', { name, email, password });
        navigate('/dashboard'); // Redirige al dashboard después de un registro exitoso
      } else {
        // Lógica de login (puedes hacer la solicitud HTTP aquí)
        console.log('Usuario logueado:', { email, password });
        navigate('/dashboard'); // Redirige al dashboard después de un login exitoso
      }
    } catch (error) {
      // Manejo de errores de la solicitud
      console.error('Error en el proceso de autenticación:', error);
      setError('Hubo un problema al procesar tu solicitud. Intenta de nuevo.');
    } finally {
      setIsLoading(false); // Detener el estado de carga
    }
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

        {/* Mostrar el mensaje de error */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Nombre"
                className="input-field pl-12"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Correo Electrónico"
              className="input-field pl-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              className="input-field pl-12 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading} // Deshabilita el botón durante la carga
          >
            {isLoading ? 'Cargando...' : isRegister ? 'Registrarse' : 'Iniciar Sesión'}
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
