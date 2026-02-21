import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contex/auth/authContext'

const Login = () => {
  const navigate = useNavigate()
  const { login, error, limpiarError } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    limpiarError()

    if (!email || !password) {
      alert('Por favor completa todos los campos')
      return
    }

    try {
      setCargando(true)
      await login(email, password)
      navigate('/')
    } catch (err) {
      console.error('Error en login:', err)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Iniciar Sesión</h1>
      
      {error && (
        <div style={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: cargando ? 'not-allowed' : 'pointer',
            opacity: cargando ? 0.6 : 1
          }}
        >
          {cargando ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        ¿No tienes cuenta? 
        <span 
          onClick={() => navigate('/registro')}
          style={{ 
            color: '#2196F3', 
            cursor: 'pointer', 
            marginLeft: '5px',
            textDecoration: 'underline'
          }}
        >
          Regístrate aquí
        </span>
      </p>
    </div>
  )
}

export default Login
