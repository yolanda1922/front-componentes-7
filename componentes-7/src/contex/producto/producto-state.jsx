import { useReducer } from 'react';
import ProductoContext from './producto-context';
import ProductoReducer from './producto-reducer';

const ProductoState = ({ children }) => {
  const initialState = {
    productos: [
      { id: 1, nombre: 'Laptop', precio: 1200, descripcion: 'Laptop de alta gama', imagen: 'https://via.placeholder.com/200' },
      { id: 2, nombre: 'Mouse', precio: 25, descripcion: 'Mouse inalámbrico', imagen: 'https://via.placeholder.com/200' },
      { id: 3, nombre: 'Teclado', precio: 75, descripcion: 'Teclado mecánico RGB', imagen: 'https://via.placeholder.com/200' },
      { id: 4, nombre: 'Monitor', precio: 350, descripcion: 'Monitor 27 pulgadas 4K', imagen: 'https://via.placeholder.com/200' },
      { id: 5, nombre: 'Audífonos', precio: 150, descripcion: 'Audífonos con cancelación de ruido', imagen: 'https://via.placeholder.com/200' },
      { id: 6, nombre: 'Webcam', precio: 80, descripcion: 'Webcam HD 1080p', imagen: 'https://via.placeholder.com/200' },
      { id: 7, nombre: 'Impresora', precio: 200, descripcion: 'Impresora multifuncional', imagen: 'https://via.placeholder.com/200' },
      { id: 8, nombre: 'Disco SSD', precio: 120, descripcion: 'SSD 1TB NVMe', imagen: 'https://via.placeholder.com/200' }
    ],
    carrito: []
  };

  const [state, dispatch] = useReducer(ProductoReducer, initialState);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    dispatch({
      type: 'AGREGAR_AL_CARRITO',
      payload: producto
    });
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
    dispatch({
      type: 'ELIMINAR_DEL_CARRITO',
      payload: id
    });
  };

  // Actualizar cantidad de producto
  const actualizarCantidad = (id, cantidad) => {
    dispatch({
      type: 'ACTUALIZAR_CANTIDAD',
      payload: { id, cantidad }
    });
  };

  // Limpiar carrito
  const limpiarCarrito = () => {
    dispatch({
      type: 'LIMPIAR_CARRITO'
    });
  };

  // Calcular total del carrito
  const totalCarrito = state.carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  // Calcular cantidad total de items
  const cantidadTotal = state.carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  return (
    <ProductoContext.Provider
      value={{
        productos: state.productos,
        carrito: state.carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        limpiarCarrito,
        totalCarrito,
        cantidadTotal
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};

export default ProductoState;
