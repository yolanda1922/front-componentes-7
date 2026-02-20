import Router from './Router'
import ProductoState from './contex/producto/producto-state'

function App() {
  return (
    <ProductoState>
      <Router />
    </ProductoState>
  )
}

export default App
