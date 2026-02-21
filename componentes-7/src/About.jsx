import { useContext } from 'react'
import ProductoContext from './contex/producto/producto-context'

const About = () => {
  const { cantidadTotal } = useContext(ProductoContext);
  
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      backgroundColor: '#f9f9f9',
      minHeight: '80vh'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    title: {
      fontSize: '2.5em',
      color: '#333',
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '1.2em',
      color: '#666',
      marginBottom: '20px'
    },
    content: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
      alignItems: 'center',
      marginBottom: '40px'
    },
    textSection: {
      lineHeight: '1.8',
      color: '#555',
      fontSize: '1.05em'
    },
    imageSection: {
      textAlign: 'center'
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    paragraph: {
      marginBottom: '15px',
      textAlign: 'justify'
    },
    section: {
      marginTop: '40px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    sectionTitle: {
      fontSize: '1.5em',
      color: '#333',
      marginBottom: '15px',
      borderBottom: '3px solid #3498db',
      paddingBottom: '10px'
    },
    featuresList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginTop: '20px'
    },
    feature: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f0f8ff',
      borderRadius: '8px',
      border: '2px solid #3498db'
    },
    featureTitle: {
      fontSize: '1.2em',
      color: '#3498db',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    cartInfo: {
      backgroundColor: '#e3f2fd',
      padding: '15px',
      borderRadius: '8px',
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '1.1em',
      color: '#1976d2'
    },
    footer: {
      textAlign: 'center',
      marginTop: '40px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px'
    }
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Acerca de Nosotros</h1>
        <p style={styles.subtitle}>Tu tienda online de confianza</p>
      </div>

      <div style={styles.content}>
        <div style={styles.textSection}>
          <p style={styles.paragraph}>
            Bienvenido a nuestra tienda online. Somos una empresa dedicada a ofrecer productos de alta calidad 
            a precios competitivos. Contamos con más de 10 años de experiencia en el mercado del comercio electrónico.
          </p>
          
          <p style={styles.paragraph}>
            Nuestra misión es proporcionar una experiencia de compra excepcional a nuestros clientes, 
            ofreciendo un catálogo diverso de productos seleccionados cuidadosamente, con atención personalizada 
            y entrega rápida a todo el país.
          </p>
          
          <p style={styles.paragraph}>
            Contamos con un equipo profesional y comprometido que trabaja día a día para asegurar que 
            cada compra que realices sea satisfactoria. Nos enorgullece contar con miles de clientes satisfechos 
            que confían en nosotros para sus compras.
          </p>
        </div>

        <div style={styles.imageSection}>
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop" 
            alt="Sobre nosotros"
            style={styles.image}
          />
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>¿Por qué elegirnos?</h2>
        <div style={styles.featuresList}>
          <div style={styles.feature}>
            <div style={styles.featureTitle}>✓ Productos de Calidad</div>
            <p>Seleccionamos cuidadosamente cada producto para garantizar la mejor calidad</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureTitle}>✓ Precios Competitivos</div>
            <p>Ofrecemos los mejores precios del mercado sin comprometer la calidad</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureTitle}>✓ Envío Rápido</div>
            <p>Entrega rápida y segura a todo el país en 2-3 días hábiles</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureTitle}>✓ Atención al Cliente</div>
            <p>Soporte 24/7 para resolver todas tus dudas y consultas</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureTitle}>✓ Seguridad</div>
            <p>Plataforma segura con encriptación de datos y pagos protegidos</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureTitle}>✓ Garantía</div>
            <p>Todos nuestros productos cuentan con garantía y política de devoluciones</p>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Nuestros Valores</h2>
        <p style={styles.paragraph}>
          <strong>Integridad:</strong> Actuamos con transparencia y honestidad en todas nuestras transacciones.
        </p>
        <p style={styles.paragraph}>
          <strong>Excelencia:</strong> Nos esforzamos por ofrecer lo mejor en cada aspecto de nuestro servicio.
        </p>
        <p style={styles.paragraph}>
          <strong>Sostenibilidad:</strong> Nos comprometemos con el medio ambiente y prácticas comerciales responsables.
        </p>
        <p style={styles.paragraph}>
          <strong>Innovación:</strong> Constantemente mejoramos nuestros procesos y ofertas para mejor experiencia del cliente.
        </p>
      </div>

      <div style={styles.cartInfo}>
        <p>Actualmente tienes <strong>{cantidadTotal}</strong> producto(s) en tu carrito</p>
      </div>

      <div style={styles.footer}>
        <p>¿Tienes preguntas? Contáctanos en info@tienda.com o llama al +56 9 1234 5678</p>
      </div>
    </div>
  )
}

export default About
