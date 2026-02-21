import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductoContext from '../contex/producto/producto-context';
import AuthContext from '../contex/auth/authContext';

export default function Cart() {
  const navigate = useNavigate();
  const { state, eliminarDelCarrito, actualizarCantidad } = useContext(ProductoContext);
  const { state: authState } = useContext(AuthContext);

  const { carrito, totalCarrito } = state;

  const handleEliminar = (productoId) => {
    eliminarDelCarrito(productoId);
  };

  const handleCambiarCantidad = (productoId, cantidad) => {
    if (cantidad > 0) {
      actualizarCantidad(productoId, cantidad);
    }
  };

  const handleSiguiente = () => {
    if (!authState.autenticado) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (carrito.length === 0) {
    return (
      <div style={styles.container}>
        <h1>Carrito de Compras</h1>
        <div style={styles.emptyCart}>
          <p>Tu carrito está vacío</p>
          <button 
            onClick={() => navigate('/home')}
            style={styles.continuarButton}
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Carrito de Compras</h1>
      
      <div style={styles.cartWrapper}>
        <div style={styles.cartItems}>
          {carrito.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <div style={styles.itemImage}>
                <img 
                  src={item.imagen} 
                  alt={item.nombre}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </div>
              
              <div style={styles.itemDetails}>
                <h3>{item.nombre}</h3>
                <p style={styles.precio}>${item.precio.toFixed(2)}</p>
              </div>

              <div style={styles.itemControls}>
                <button 
                  onClick={() => handleCambiarCantidad(item.id, item.cantidad - 1)}
                  style={styles.btnCantidad}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={item.cantidad}
                  onChange={(e) => handleCambiarCantidad(item.id, parseInt(e.target.value) || 1)}
                  style={styles.inputCantidad}
                />
                <button 
                  onClick={() => handleCambiarCantidad(item.id, item.cantidad + 1)}
                  style={styles.btnCantidad}
                >
                  +
                </button>
              </div>

              <div style={styles.subtotal}>
                ${(item.precio * item.cantidad).toFixed(2)}
              </div>

              <button 
                onClick={() => handleEliminar(item.id)}
                style={styles.btnEliminar}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div style={styles.cartSummary}>
          <h2>Resumen del Pedido</h2>
          
          <div style={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${totalCarrito.toFixed(2)}</span>
          </div>
          
          <div style={styles.summaryRow}>
            <span>Envío:</span>
            <span>Calculado en checkout</span>
          </div>

          <div style={styles.summaryRow}>
            <span>Impuestos:</span>
            <span>Calculado en checkout</span>
          </div>

          <hr style={styles.divider} />

          <div style={styles.summaryRow}>
            <strong>Total:</strong>
            <strong>${totalCarrito.toFixed(2)}</strong>
          </div>

          <button 
            onClick={handleSiguiente}
            style={styles.checkoutButton}
          >
            Ir a Checkout
          </button>

          <button 
            onClick={() => navigate('/home')}
            style={styles.continuarButton}
          >
            Continuar Comprando
          </button>

          {!authState.autenticado && (
            <p style={styles.noticia}>
              Debes iniciar sesión para continuar con tu compra
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '80vh'
  },
  cartWrapper: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
    marginTop: '20px'
  },
  cartItems: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  cartItem: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr auto auto auto',
    gap: '15px',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #eee',
  },
  itemImage: {
    textAlign: 'center'
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  precio: {
    color: '#e74c3c',
    fontSize: '1.1em',
    fontWeight: 'bold',
    margin: '0'
  },
  itemControls: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center'
  },
  btnCantidad: {
    width: '30px',
    height: '30px',
    padding: '0',
    border: '1px solid #ddd',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1em'
  },
  inputCantidad: {
    width: '50px',
    padding: '5px',
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  subtotal: {
    fontWeight: 'bold',
    fontSize: '1.1em',
    minWidth: '80px',
    textAlign: 'right'
  },
  btnEliminar: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1.1em',
    width: '35px',
    height: '35px'
  },
  cartSummary: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: 'fit-content'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    fontSize: '0.95em'
  },
  divider: {
    margin: '10px 0',
    border: 'none',
    borderTop: '2px solid #eee'
  },
  checkoutButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '15px'
  },
  continuarButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px'
  },
  emptyCart: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '8px'
  },
  noticia: {
    backgroundColor: '#fff3cd',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '10px',
    color: '#856404',
    fontSize: '0.9em'
  }
};
