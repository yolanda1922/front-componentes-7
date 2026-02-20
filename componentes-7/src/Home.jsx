import { useContext } from 'react'
import ProductoContext from './contex/producto/producto-context'

const Home = () => {
  const { productos, agregarAlCarrito } = useContext(ProductoContext);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <p>Bienvenido a nuestra tienda</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px',
        marginTop: '30px'
      }}>
        {productos.map(producto => (
          <div key={producto.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{producto.nombre}</h3>
            <p style={{ color: '#666', fontSize: '14px', margin: '10px 0' }}>{producto.descripcion}</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2196F3', margin: '10px 0 0 0' }}>
              ${producto.precio}
            </p>
            <button 
              onClick={() => agregarAlCarrito(producto)}
              style={{
                marginTop: '15px',
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%'
              }}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
