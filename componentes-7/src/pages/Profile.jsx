import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contex/auth/authContext';

export default function Profile() {
  const navigate = useNavigate();
  const { state, logout } = useContext(AuthContext);
  const { autenticado, usuario } = state;
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
      setIsLoggingOut(false);
      navigate('/');
    }, 500);
  };

  const handleCancelLogout = () => {
    setShowConfirm(false);
  };

  if (!autenticado) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1>⚠️ No Autenticado</h1>
          <p>Debes iniciar sesión para acceder al perfil.</p>
          <button 
            onClick={() => navigate('/login')}
            style={styles.buttonPrimary}
          >
            Ir a Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.avatar}>👤</div>
          <h1>{usuario?.nombre || 'Usuario'}</h1>
          <p style={styles.subtitle}>Perfil de Usuario</p>
        </div>

        <div style={styles.section}>
          <h2>📋 Información de Cuenta</h2>
          <div style={styles.info}>
            <div style={styles.infoRow}>
              <span style={styles.label}>📛 Nombre:</span>
              <span style={styles.value}>{usuario?.nombre || 'No disponible'}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>📧 Email:</span>
              <span style={styles.value}>{usuario?.email || 'No disponible'}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>✅ Estado:</span>
              <span style={{ ...styles.value, color: '#4CAF50', fontWeight: 'bold' }}>
                ✓ Sesión Activa
              </span>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2>🛠️ Acciones Rápidas</h2>
          <div style={styles.actions}>
            <button 
              onClick={() => navigate('/')}
              style={{...styles.buttonSecondary, width: '100%'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1976D2'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2196F3'}
            >
              🏠 Volver al Inicio
            </button>
            <button 
              onClick={() => navigate('/carrito')}
              style={{...styles.buttonSecondary, width: '100%'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1976D2'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2196F3'}
            >
              🛒 Ver Carrito
            </button>
          </div>
        </div>

        {!showConfirm ? (
          <div style={styles.logoutSection}>
            <button 
              onClick={handleLogoutClick}
              style={{
                ...styles.buttonLogout,
                transform: 'scale(1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.backgroundColor = '#d32f2f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#f44336';
              }}
            >
              🚪 CERRAR SESIÓN
            </button>
          </div>
        ) : (
          <div style={styles.confirmDialog}>
            <div style={styles.confirmContent}>
              <h3>⚠️ Confirmar Cierre de Sesión</h3>
              <p>¿Estás seguro de que deseas cerrar sesión?</p>
              <p style={styles.warningText}>Tendrás que volver a iniciar sesión para continuar comprando.</p>
              
              <div style={styles.confirmButtons}>
                <button 
                  onClick={handleConfirmLogout}
                  disabled={isLoggingOut}
                  style={{
                    ...styles.buttonConfirmYes,
                    opacity: isLoggingOut ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoggingOut) e.currentTarget.style.backgroundColor = '#d32f2f';
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoggingOut) e.currentTarget.style.backgroundColor = '#f44336';
                  }}
                >
                  {isLoggingOut ? '⏳ Cerrando...' : '✓ Sí, Cerrar Sesión'}
                </button>
                <button 
                  onClick={handleCancelLogout}
                  disabled={isLoggingOut}
                  style={{
                    ...styles.buttonConfirmNo,
                    opacity: isLoggingOut ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoggingOut) e.currentTarget.style.backgroundColor = '#1976D2';
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoggingOut) e.currentTarget.style.backgroundColor = '#2196F3';
                  }}
                >
                  ✕ Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={styles.footer}>
          <p style={styles.tip}>
            💡 Recuerda: Siempre puedes cerrar sesión haciendo click en el botón 🚪 de la barra superior.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    minHeight: '80vh',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '40px',
    maxWidth: '600px',
    width: '100%'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '2px solid #eee'
  },
  avatar: {
    fontSize: '5em',
    marginBottom: '15px'
  },
  subtitle: {
    color: '#666',
    fontSize: '0.9em'
  },
  section: {
    marginBottom: '25px'
  },
  info: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '15px'
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #eee',
    alignItems: 'center'
  },
  label: {
    fontWeight: 'bold',
    color: '#333'
  },
  value: {
    color: '#666'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  buttonPrimary: {
    padding: '12px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  buttonSecondary: {
    padding: '12px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.95em',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  logoutSection: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '2px solid #eee'
  },
  buttonLogout: {
    padding: '15px 40px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(244, 67, 54, 0.3)'
  },
  confirmDialog: {
    backgroundColor: '#fff3cd',
    border: '2px solid #ffc107',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px'
  },
  confirmContent: {
    textAlign: 'center'
  },
  warningText: {
    color: '#856404',
    fontSize: '0.9em',
    marginTop: '10px'
  },
  confirmButtons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginTop: '15px'
  },
  buttonConfirmYes: {
    padding: '12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.9em',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  buttonConfirmNo: {
    padding: '12px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.9em',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  footer: {
    marginTop: '20px'
  },
  tip: {
    backgroundColor: '#e3f2fd',
    padding: '10px',
    borderRadius: '4px',
    color: '#0d47a1',
    marginTop: '20px',
    marginBottom: '0',
    fontSize: '0.85em'
  }
};

