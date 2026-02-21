import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import ProductoContext from '../../contex/producto/producto-context'
import AuthContext from '../../contex/auth/authContext'

const Header = () => {
  const navigate = useNavigate()
  const { cantidadTotal } = useContext(ProductoContext)
  const { autenticado, usuario, logout } = useContext(AuthContext)
  
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleCartClick = () => {
    navigate('/carrito')
  }
  
  return (
    <header style={{ padding: '20px', backgroundColor: '#333', color: 'white' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
          <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
          <li><Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link></li>
          <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link></li>
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
              position: 'relative'
            }}
          >
            🛒 Carrito {cantidadTotal > 0 && <span style={{ marginLeft: '5px' }}>({cantidadTotal})</span>}
          </button>
          
          {autenticado ? (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ backgroundColor: '#4CAF50', padding: '8px 16px', borderRadius: '4px' }}>
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
                  fontWeight: 'bold'
                }}
              >
                Logout
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
                  fontWeight: 'bold'
                }}
              >
                Login
              </Link>
              <Link 
                to="/registro"
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Registro
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header