import { createContext, useState } from 'react';

export const ProductoContext = createContext();

export const ProductoProvider = ({ children }) => {
  const [productos] = useState([
    { id: 1, nombre: 'Laptop', precio: 1200, descripcion: 'Laptop de alta gama' },
    { id: 2, nombre: 'Mouse', precio: 25, descripcion: 'Mouse inalámbrico' },
    { id: 3, nombre: 'Teclado', precio: 75, descripcion: 'Teclado mecánico RGB' },
    { id: 4, nombre: 'Monitor', precio: 350, descripcion: 'Monitor 27 pulgadas 4K' },
    { id: 5, nombre: 'Audífonos', precio: 150, descripcion: 'Audífonos con cancelación de ruido' },
    { id: 6, nombre: 'Webcam', precio: 80, descripcion: 'Webcam HD 1080p' },
    { id: 7, nombre: 'Impresora', precio: 200, descripcion: 'Impresora multifuncional' },
    { id: 8, nombre: 'Disco SSD', precio: 120, descripcion: 'SSD 1TB NVMe' }
  ]);

  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      setCarrito(carrito.map(item =>
        item.id === id ? { ...item, cantidad } : item
      ));
    }
  };

  const totalCarrito = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <ProductoContext.Provider value={{
      productos,
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      actualizarCantidad,
      totalCarrito,
      cantidadTotal
    }}>
      {children}
    </ProductoContext.Provider>
  );
};

export default ProductoContext;
