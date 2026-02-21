import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import ProductoContext from '../../contex/producto/producto-context'
import AuthContext from '../../contex/auth/authContext'

const Header = () => {
  const navigate = useNavigate()
  const { cantidadTotal } = useContext(ProductoContext)
  const { autenticado, usuario, logout } = useContext(AuthContext)
  const [logoutMessage, setLogoutMessage] = useState(null)
  
  const handleLogout = () => {
    const confirmar = window.confirm('¿Estás seguro de que deseas cerrar sesión?')
    if (confirmar) {
      logout()
      setLogoutMessage('Sesión cerrada correctamente')
      setTimeout(() => {
        setLogoutMessage(null)
        navigate('/')
      }, 2000)
    }
  }

  const handleCartClick = () => {
    navigate('/carrito')
  }
  
  return (
    <header style={{ padding: '20px', backgroundColor: '#333', color: 'white' }}>
      {logoutMessage && (
        <div style={{
          backgroundColor: '#4CAF50',
          padding: '10px 20px',
          marginBottom: '10px',
          borderRadius: '4px',
          textAlign: 'center',
          fontSize: '0.95em'
        }}>
          ✓ {logoutMessage}
        </div>
      )}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
          <li><Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link></li>
          <li><Link to="/about" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>About</Link></li>
          <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Contact</Link></li>
        </ul>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button
            onClick={handleCartClick}
            style={{ 
              backgroundColor: '#2196F3', 
              padding: '8px 16px', 
              borderRadius: '20px', 
              fontWeight: 'bold',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1976D2'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2196F3'}
          >
            🛒 Carrito {cantidadTotal > 0 && <span style={{ marginLeft: '5px' }}>({cantidadTotal})</span>}
          </button>
          
          {autenticado ? (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span 
                onClick={() => navigate('/perfil')}
                style={{ 
                  backgroundColor: '#4CAF50', 
                  padding: '8px 16px', 
                  borderRadius: '4px', 
                  fontSize: '0.9em',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#388E3C'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
              >
                👤 {usuario?.nombre || 'Usuario'}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d32f2f'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link 
                to="/login"
                style={{
                  backgroundColor: '#2196F3',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1976D2'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2196F3'}
              >
                👤 Login
              </Link>
              <Link 
                to="/registro"
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#388E3C'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
              >
                ✏️ Registro
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header