import { Link } from 'react-router-dom'
import { useContext } from 'react'
import ProductoContext from '../../contex/producto/producto-context'

const Header = () => {
  const { cantidadTotal } = useContext(ProductoContext);
  
  return (
    <header style={{ padding: '20px', backgroundColor: '#333', color: 'white' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
          <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
          <li><Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link></li>
          <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link></li>
        </ul>
        <div style={{ backgroundColor: '#2196F3', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>
          🛒 Carrito: {cantidadTotal}
        </div>
      </nav>
    </header>
  )
}

export default Header