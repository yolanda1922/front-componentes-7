const ProductoReducer = (state, action) => {
  switch (action.type) {
    case 'CARGAR_PRODUCTOS':
      return {
        ...state,
        productos: action.payload
      };

    case 'AGREGAR_AL_CARRITO': {
      const productoExistente = state.carrito.find(
        item => item.id === action.payload.id
      );

      if (productoExistente) {
        return {
          ...state,
          carrito: state.carrito.map(item =>
            item.id === action.payload.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          carrito: [...state.carrito, { ...action.payload, cantidad: 1 }]
        };
      }
    }

    case 'ELIMINAR_DEL_CARRITO':
      return {
        ...state,
        carrito: state.carrito.filter(item => item.id !== action.payload)
      };

    case 'ACTUALIZAR_CANTIDAD':
      if (action.payload.cantidad <= 0) {
        return {
          ...state,
          carrito: state.carrito.filter(item => item.id !== action.payload.id)
        };
      }
      return {
        ...state,
        carrito: state.carrito.map(item =>
          item.id === action.payload.id
            ? { ...item, cantidad: action.payload.cantidad }
            : item
        )
      };

    case 'LIMPIAR_CARRITO':
      return {
        ...state,
        carrito: []
      };

    default:
      return state;
  }
};

export default ProductoReducer;
