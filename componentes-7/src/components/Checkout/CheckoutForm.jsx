import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductoContext from '../../contex/producto/producto-context';
import AuthContext from '../../contex/auth/authContext';
import { confirmarPagoCliente, crearOrden } from '../../services/stripeService';

// Intenta importar CardElement si Stripe está instalado
let CardElement = null;
try {
  const stripe = require('@stripe/react-stripe-js');
  CardElement = stripe.CardElement;
} catch (e) {
  // Stripe no está instalado
}

export default function CheckoutForm({ clientSecret }) {
  const navigate = useNavigate();
  const { state, limpiarCarrito } = useContext(ProductoContext);
  const { state: authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { carrito, totalCarrito } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Aquí se procesaría el pago con Stripe
      // Por ahora simulamos un pago exitoso
      
      // En producción, usarías:
      // const stripe = useStripe();
      // const elements = useElements();
      // const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, { ... })

      // Para esta demostración, asumimos que el pago fue exitoso
      const datosOrden = {
        items: carrito,
        total: totalCarrito,
        usuarioId: authState.usuario?.id,
        email: authState.usuario?.email,
        estado: 'completada',
        paymentIntentId: clientSecret // En producción sería el ID real del pago
      };

      const ordenResponse = await crearOrden(datosOrden);
      
      setSuccess(true);
      limpiarCarrito();
      
      // Redirigir a página de confirmación
      setTimeout(() => {
        navigate('/orden-confirmada', { state: { orden: ordenResponse } });
      }, 2000);

    } catch (err) {
      setError('Error al procesar el pago: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={styles.success}>
        <h2>✓ Pago Exitoso</h2>
        <p>Tu pedido ha sido procesado correctamente.</p>
        <p>Redirigiendo a la confirmación...</p>
      </div>
    );
  }

  // Si Stripe no está instalado, mostrar mensaje
  if (!CardElement) {
    return (
      <div style={styles.info}>
        <h3>⚠️ Stripe no está instalado</h3>
        <p>Para habilitarStipe, ejecuta el siguiente comando:</p>
        <pre style={styles.code}>npm install @stripe/react-stripe-js @stripe/js</pre>
        <p>Luego actualiza <code>App.jsx</code> descomentando el código de Stripe.</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.mockCardContainer}>
            <label style={styles.label}>Tarjeta de Crédito (Modo Demo)</label>
            <input 
              type="text" 
              placeholder="4242 4242 4242 4242" 
              maxLength="19"
              style={styles.mockInput}
            />
            <div style={styles.row}>
              <input 
                type="text" 
                placeholder="MM/AA" 
                style={styles.mockInputSmall}
              />
              <input 
                type="text" 
                placeholder="CVC" 
                maxLength="3"
                style={styles.mockInputSmall}
              />
            </div>
          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            style={styles.submitButton}
          >
            {loading ? 'Procesando pago...' : `Pagar $${totalCarrito.toFixed(2)}`}
          </button>

          <div style={styles.testInfo}>
            <p><strong>Tarjetas de Prueba (solo para desarrollo):</strong></p>
            <ul>
              <li>✓ Exitoso: <code>4242 4242 4242 4242</code></li>
              <li>✗ Rechazada: <code>4000 0000 0000 0002</code></li>
              <li>CVC: Cualquier 3 dígitos</li>
              <li>Fecha: Cualquier fecha futura</li>
            </ul>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.cardContainer}>
        <label style={styles.label}>Información de la Tarjeta</label>
        <div style={styles.cardElement}>
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      <button 
        type="submit"
        disabled={loading}
        style={styles.submitButton}
      >
        {loading ? 'Procesando pago...' : `Pagar $${totalCarrito.toFixed(2)}`}
      </button>

      <div style={styles.info}>
        <p>Este es un formulario de demostración. Para efectuar compras reales, necesitarás:</p>
        <ul>
          <li>Una cuenta de Stripe</li>
          <li>Las claves públicas y secretas configuradas</li>
          <li>Un backend que maneje los pagos de forma segura</li>
        </ul>
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  mockCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '15px'
  },
  label: {
    fontWeight: 'bold',
    fontSize: '0.95em'
  },
  cardElement: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fafbfc'
  },
  mockInput: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1em',
    fontFamily: 'monospace'
  },
  mockInputSmall: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.9em'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px'
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '12px',
    borderRadius: '4px',
    fontSize: '0.9em'
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '20px',
    borderRadius: '4px',
    textAlign: 'center'
  },
  submitButton: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px'
  },
  info: {
    backgroundColor: '#e7f3ff',
    padding: '12px',
    borderRadius: '4px',
    fontSize: '0.85em',
    color: '#004085',
    marginTop: '15px'
  },
  code: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    marginTop: '10px',
    border: '1px solid #ddd'
  },
  testInfo: {
    backgroundColor: '#fff3cd',
    padding: '12px',
    borderRadius: '4px',
    color: '#856404',
    fontSize: '0.85em'
  }
};
