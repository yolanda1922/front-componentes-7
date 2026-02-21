import { useReducer, useEffect } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import { obtenerUsuarioActual, obtenerToken } from '../../services/authService';

const AuthState = ({ children }) => {
  const initialState = {
    usuario: null,
    token: null,
    autenticado: false,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Cargar usuario al iniciar la aplicación
  useEffect(() => {
    const usuario = obtenerUsuarioActual();
    const token = obtenerToken();
    
    if (usuario && token) {
      dispatch({
        type: 'CARGAR_USUARIO',
        payload: { usuario, token }
      });
    }
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const { login: loginService } = await import('../../services/authService');
      const resultado = await loginService(email, password);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: resultado
      });
      return resultado;
    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error.message
      });
      throw error;
    }
  };

  // Registro
  const registro = async (nombre, email, password, confirmPassword) => {
    try {
      const { registro: registroService } = await import('../../services/authService');
      const resultado = await registroService(nombre, email, password, confirmPassword);
      dispatch({
        type: 'REGISTRO_SUCCESS',
        payload: resultado
      });
      return resultado;
    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error.message
      });
      throw error;
    }
  };

  // Logout
  const logout = () => {
    const { logout: logoutService } = require('../../services/authService');
    logoutService();
    dispatch({ type: 'LOGOUT' });
  };

  // Limpiar error
  const limpiarError = () => {
    dispatch({ type: 'LIMPIAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        state: {
          usuario: state.usuario,
          token: state.token,
          autenticado: state.autenticado,
          error: state.error
        },
        usuario: state.usuario,
        token: state.token,
        autenticado: state.autenticado,
        error: state.error,
        login,
        registro,
        logout,
        limpiarError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
