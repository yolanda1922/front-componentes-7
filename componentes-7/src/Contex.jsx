import { useContext } from 'react'
import ProductoContext from './contex/producto/producto-context'

const Contact = () => {
  const { totalCarrito, carrito } = useContext(ProductoContext);
  
  return (
    <div>
      <h1>Contact</h1>
      <p>Ponte en contacto con nosotros</p>
      {carrito.length > 0 && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Resumen de tu carrito:</h3>
          <p>Productos: {carrito.length}</p>
          <p>Total: ${totalCarrito.toFixed(2)}</p>
        </div>
      )}
    </div>
  )
}

export default Contact
