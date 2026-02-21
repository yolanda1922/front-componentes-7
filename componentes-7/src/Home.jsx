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
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          }}
          >
            <div style={{
              width: '100%',
              height: '220px',
              overflow: 'hidden',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={producto.imagen} 
                alt={producto.nombre}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ padding: '20px' }}>
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
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
              >
                🛒 Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
