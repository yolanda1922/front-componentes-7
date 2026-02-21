import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orden } = location.state || {};

  if (!orden) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1>⚠️ Error</h1>
          <p>No se encontró información de la orden.</p>
          <button 
            onClick={() => navigate('/home')}
            style={styles.button}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.checkmark}>✓</div>
        <h1>¡Orden Confirmada!</h1>
        
        <div style={styles.section}>
          <h2>Detalles de la Orden</h2>
          <div style={styles.details}>
            <div style={styles.row}>
              <span>Número de Orden:</span>
              <strong>{orden.id || 'ORD-12345'}</strong>
            </div>
            <div style={styles.row}>
              <span>Fecha:</span>
              <strong>{new Date().toLocaleDateString('es-ES')}</strong>
            </div>
            <div style={styles.row}>
              <span>Estado:</span>
              <strong style={{ color: '#27ae60' }}>Completada</strong>
            </div>
            <div style={styles.row}>
              <span>Total:</span>
              <strong>${orden.total?.toFixed(2) || '0.00'}</strong>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2>Próximos Pasos</h2>
          <ul style={styles.list}>
            <li>Recibirás un email de confirmación en los próximos minutos</li>
            <li>Tu pedido será procesado y enviado en 1-2 días hábiles</li>
            <li>Podrás rastrear tu envío desde tu cuenta</li>
            <li>Si tienes preguntas, no dudes en contactarnos</li>
          </ul>
        </div>

        <div style={styles.actions}>
          <button 
            onClick={() => navigate('/home')}
            style={styles.buttonPrimary}
          >
            Continuar Comprando
          </button>
          <button 
            onClick={() => navigate('/cuenta')}
            style={styles.buttonSecondary}
          >
            Ver Mis Órdenes
          </button>
        </div>

        <div style={styles.support}>
          <h3>¿Necesitas Ayuda?</h3>
          <p>Contacta con nuestro equipo de soporte:</p>
          <p>📧 soporte@tienda.com</p>
          <p>📞 1-800-123-4567</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '40px',
    maxWidth: '600px',
    textAlign: 'center'
  },
  checkmark: {
    width: '80px',
    height: '80px',
    backgroundColor: '#27ae60',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3em',
    margin: '0 auto 20px'
  },
  section: {
    marginTop: '30px',
    textAlign: 'left',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '4px'
  },
  details: {
    marginTop: '15px'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #eee'
  },
  list: {
    marginTop: '15px',
    paddingLeft: '20px'
  },
  actions: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginTop: '30px'
  },
  buttonPrimary: {
    padding: '12px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  buttonSecondary: {
    padding: '12px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  support: {
    marginTop: '30px',
    backgroundColor: '#e7f3ff',
    padding: '20px',
    borderRadius: '4px',
    color: '#004085'
  }
};
