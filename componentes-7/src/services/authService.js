import api from '../config/axios';

// Login
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    }
    return response.data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// Registro
export const registro = async (nombre, email, password, confirmPassword) => {
  try {
    if (password !== confirmPassword) {
      throw new Error('Las contraseñas no coinciden');
    }
    const response = await api.post('/auth/registro', { nombre, email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    }
    return response.data;
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};

// Obtener usuario actual
export const obtenerUsuarioActual = () => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
};

// Obtener token
export const obtenerToken = () => {
  return localStorage.getItem('token');
};

// Verificar si está autenticado
export const estaAutenticado = () => {
  return !!localStorage.getItem('token');
};
