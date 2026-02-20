import { useContext } from 'react'
import ProductoContext from '../../contex/producto/producto-context'

const ListaProductos = () => {
    const ctx = useContext(ProductoContext);

  return (
    <div>lista-productos</div>
  )
}

export default ListaProductos