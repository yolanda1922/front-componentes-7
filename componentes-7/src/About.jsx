import { useContext } from 'react'
import ProductoContext from './contex/producto/producto-context'

const About = () => {
  const { cantidadTotal } = useContext(ProductoContext);
  
  return (
    <div>
      <h1>About</h1>
      <p>Información sobre nosotros</p>
      <p>Actualmente tienes {cantidadTotal} productos en tu carrito</p>
    </div>
  )
}

export default About
