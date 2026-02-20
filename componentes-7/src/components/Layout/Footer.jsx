import { useContext } from 'react'
import ProductoContext from '../../contex/producto/producto-context'

const Footer = () => {
  const { totalCarrito } = useContext(ProductoContext);
  
  return (
    <footer style={{ padding: '20px', backgroundColor: '#333', color: 'white', textAlign: 'center', marginTop: '40px' }}>
      <p>&copy; 2026 - Todos los derechos reservados</p>
      {totalCarrito > 0 && (
        <p style={{ marginTop: '10px', fontSize: '14px' }}>
          Total en carrito: ${totalCarrito.toFixed(2)}
        </p>
      )}
    </footer>
  )
}

export default Footer