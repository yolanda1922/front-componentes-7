const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        usuario: action.payload.usuario,
        token: action.payload.token,
        autenticado: true,
        error: null
      };

    case 'REGISTRO_SUCCESS':
      return {
        ...state,
        usuario: action.payload.usuario,
        token: action.payload.token,
        autenticado: true,
        error: null
      };

    case 'LOGOUT':
      return {
        ...state,
        usuario: null,
        token: null,
        autenticado: false,
        error: null
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        error: action.payload,
        autenticado: false
      };

    case 'LIMPIAR_ERROR':
      return {
        ...state,
        error: null
      };

    case 'CARGAR_USUARIO':
      return {
        ...state,
        usuario: action.payload.usuario,
        token: action.payload.token,
        autenticado: !!action.payload.token
      };

    default:
      return state;
  }
};

export default AuthReducer;
