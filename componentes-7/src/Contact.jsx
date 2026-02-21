import { useContext, useState } from 'react'
import ProductoContext from './contex/producto/producto-context'

const Contact = () => {
  const { totalCarrito, carrito } = useContext(ProductoContext);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    });
    setTimeout(() => setEnviado(false), 3000);
  };

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
      marginBottom: '40px'
    },
    formSection: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    infoSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    infoCard: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderLeft: '4px solid #3498db'
    },
    infoTitle: {
      fontSize: '1.2em',
      color: '#333',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    infoContent: {
      color: '#666',
      lineHeight: '1.6'
    },
    formGroup: {
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      marginBottom: '8px',
      color: '#333',
      fontWeight: 'bold'
    },
    input: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1em',
      fontFamily: 'inherit',
      transition: 'border-color 0.3s'
    },
    textarea: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1em',
      fontFamily: 'inherit',
      minHeight: '150px',
      resize: 'vertical'
    },
    button: {
      padding: '12px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1em',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '10px'
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px',
      border: '1px solid #c3e6cb'
    },
    socialLinks: {
      display: 'flex',
      gap: '15px',
      marginTop: '10px'
    },
    socialButton: {
      display: 'inline-block',
      width: '40px',
      height: '40px',
      backgroundColor: '#3498db',
      color: 'white',
      borderRadius: '50%',
      textAlign: 'center',
      lineHeight: '40px',
      textDecoration: 'none',
      fontSize: '1.2em',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    hoursTable: {
      width: '100%',
      marginTop: '10px'
    },
    hoursRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      padding: '8px 0',
      borderBottom: '1px solid #eee'
    },
    cartInfo: {
      backgroundColor: '#e3f2fd',
      padding: '15px',
      borderRadius: '8px',
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '1.1em',
      color: '#1976d2'
    }
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Contáctanos</h1>
        <p style={styles.subtitle}>Estamos aquí para ayudarte</p>
      </div>

      <div style={styles.content}>
        <div style={styles.formSection}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Envía tu Mensaje</h2>
          
          {enviado && (
            <div style={styles.successMessage}>
              ¡Gracias por tu mensaje! Te responderemos pronto.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nombre *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Tu nombre completo"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="tu@email.com"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                style={styles.input}
                placeholder="+56 9 1234 5678"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Asunto *</label>
              <input
                type="text"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Asunto de tu consulta"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Mensaje *</label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                style={styles.textarea}
                placeholder="Cuéntanos cómo podemos ayudarte..."
              />
            </div>

            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
            >
              Enviar Mensaje
            </button>
          </form>
        </div>

        <div style={styles.infoSection}>
          <div style={styles.infoCard}>
            <div style={styles.infoTitle}>📍 Ubicación</div>
            <div style={styles.infoContent}>
              Calle Principal 123<br/>
              Santiago, Chile<br/>
              Región Metropolitana
            </div>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.infoTitle}>📞 Teléfono</div>
            <div style={styles.infoContent}>
              <strong>Teléfono:</strong> +56 9 1234 5678<br/>
              <strong>WhatsApp:</strong> +56 9 1234 5678<br/>
              <strong>Fax:</strong> +56 2 1234 5678
            </div>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.infoTitle}>✉️ Email</div>
            <div style={styles.infoContent}>
              <strong>Consultas:</strong> info@tienda.com<br/>
              <strong>Soporte:</strong> soporte@tienda.com<br/>
              <strong>Ventas:</strong> ventas@tienda.com
            </div>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.infoTitle}>⏰ Horario de Atención</div>
            <div style={styles.infoContent}>
              <div style={styles.hoursRow}>
                <span>Lunes - Viernes:</span>
                <span>9:00 - 18:00</span>
              </div>
              <div style={styles.hoursRow}>
                <span>Sábado:</span>
                <span>10:00 - 14:00</span>
              </div>
              <div style={styles.hoursRow}>
                <span>Domingo:</span>
                <span>Cerrado</span>
              </div>
            </div>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.infoTitle}>🌐 Síguenos</div>
            <div style={styles.socialLinks}>
              <a href="#" style={styles.socialButton} title="Facebook">f</a>
              <a href="#" style={styles.socialButton} title="Twitter">𝕏</a>
              <a href="#" style={styles.socialButton} title="Instagram">📷</a>
              <a href="#" style={styles.socialButton} title="LinkedIn">in</a>
            </div>
          </div>
        </div>
      </div>

      {carrito.length > 0 && (
        <div style={styles.cartInfo}>
          <strong>Resumen de tu carrito:</strong> {carrito.length} producto(s) - Total: ${totalCarrito.toFixed(2)}
        </div>
      )}
    </div>
  )
}

export default Contact
