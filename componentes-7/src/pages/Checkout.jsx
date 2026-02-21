import React, { useContext, useState } from 'react';
import ProductoContext from '../contex/producto/producto-context';
import AuthContext from '../contex/auth/authContext';
import CheckoutForm from '../components/Checkout/CheckoutForm';
import { crearIntencePago } from '../services/stripeService';

export default function Checkout() {
  const { state } = useContext(ProductoContext);
  const { state: authState } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { carrito, totalCarrito } = state;

  const handleCrearIntento = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await crearIntencePago(
        Math.round(totalCarrito * 100), // Convertir a centavos
        `Compra de ${carrito.length} producto(s)`
      );
      setClientSecret(data.clientSecret);
    } catch (err) {
      setError('Error al inicializar el pago. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.columnLeft}>
          <h1>Checkout</h1>
          
          <section style={styles.section}>
            <h2>Información de Envío</h2>
            <div style={styles.form}>
              <input 
                type="text" 
                placeholder="Nombre" 
                defaultValue={authState.usuario?.nombre || ''}
                style={styles.input}
              />
              <input 
                type="email" 
                placeholder="Email" 
                defaultValue={authState.usuario?.email || ''}
                style={styles.input}
              />
              <input 
                type="text" 
                placeholder="Dirección" 
                style={styles.input}
              />
              <div style={styles.formRow}>
                <input 
                  type="text" 
                  placeholder="Ciudad" 
                  style={styles.inputSmall}
                />
                <input 
                  type="text" 
                  placeholder="Código Postal" 
                  style={styles.inputSmall}
                />
              </div>
              <input 
                type="text" 
                placeholder="País" 
                style={styles.input}
              />
            </div>
          </section>

          <section style={styles.section}>
            <h2>Método de Pago</h2>
            {!clientSecret ? (
              <button 
                onClick={handleCrearIntento}
                disabled={loading}
                style={styles.btnCrearIntento}
              >
                {loading ? 'Inicializando...' : 'Continuar al Pago'}
              </button>
            ) : (
              <CheckoutForm clientSecret={clientSecret} />
            )}
            {error && <div style={styles.error}>{error}</div>}
          </section>
        </div>

        <div style={styles.columnRight}>
          <h2>Resumen del Pedido</h2>
          
          <div style={styles.orderSummary}>
            {carrito.map((item) => (
              <div key={item.id} style={styles.summaryItem}>
                <div>
                  <p style={styles.itemName}>{item.nombre}</p>
                  <p style={styles.itemQty}>Cantidad: {item.cantidad}</p>
                </div>
                <p style={styles.itemPrice}>
                  ${(item.precio * item.cantidad).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div style={styles.totals}>
            <div style={styles.totalRow}>
              <span>Subtotal:</span>
              <span>${totalCarrito.toFixed(2)}</span>
            </div>
            <div style={styles.totalRow}>
              <span>Envío:</span>
              <span>$0.00</span>
            </div>
            <div style={styles.totalRow}>
              <span>Impuestos:</span>
              <span>$0.00</span>
            </div>
            <hr style={styles.divider} />
            <div style={{ ...styles.totalRow, fontSize: '1.2em', fontWeight: 'bold' }}>
              <span>Total:</span>
              <span>${totalCarrito.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    minHeight: '80vh',
    padding: '20px'
  },
  wrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '30px'
  },
  columnLeft: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  columnRight: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: 'fit-content'
  },
  section: {
    marginBottom: '30px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1em'
  },
  inputSmall: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1em',
    flex: '1'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  btnCrearIntento: {
    padding: '12px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '12px',
    borderRadius: '4px',
    marginTop: '10px'
  },
  orderSummary: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '20px',
    maxHeight: '300px',
    overflowY: 'auto'
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee',
    marginBottom: '10px'
  },
  itemName: {
    fontWeight: 'bold',
    margin: '0 0 5px 0'
  },
  itemQty: {
    color: '#666',
    fontSize: '0.9em',
    margin: '0'
  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#e74c3c'
  },
  totals: {
    marginTop: '20px'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0'
  },
  divider: {
    margin: '10px 0',
    border: 'none',
    borderTop: '2px solid #eee'
  }
};
