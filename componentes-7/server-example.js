

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'tu_clave_secreta_super_segura_123456';

// Middleware
app.use(cors());
app.use(express.json());

// Simulación de base de datos (en memoria)
// En producción, esto sería una BD real
let usuarios = [
  {
    id: '1',
    nombre: 'Admin',
    email: 'admin@test.com',
    password: '$2b$10$abcdefghijklmnopqrstuvwxyz' // hash de "admin123"
  }
];

// ============================
// RUTAS DE AUTENTICACIÓN
// ============================

// REGISTRO - POST /api/v1/auth/registro
app.post('/api/v1/auth/registro', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    console.log('📝 Registro solicitado:', { nombre, email });

    // Validaciones
    if (!nombre || !email || !password) {
      return res.status(400).json({
        error: 'Nombre, email y contraseña son requeridos'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Contraseña debe tener mínimo 6 caracteres'
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Formato de email inválido'
      });
    }

    // Verificar si el email ya existe
    const usuarioExistente = usuarios.find(u => u.email === email);
    if (usuarioExistente) {
      return res.status(400).json({
        error: 'Email ya registrado'
      });
    }

    // Hashear contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const nuevoUsuario = {
      id: String(usuarios.length + 1),
      nombre,
      email,
      password: passwordHash
    };

    usuarios.push(nuevoUsuario);
    console.log('✅ Usuario registrado:', { id: nuevoUsuario.id, nombre, email });

    // Generar token JWT
    const token = jwt.sign(
      { id: nuevoUsuario.id, email: nuevoUsuario.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email
      }
    });

  } catch (error) {
    console.error('❌ Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// LOGIN - POST /api/v1/auth/login
app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login solicitado:', email);

    // Validaciones
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email y contraseña son requeridos'
      });
    }

    // Buscar usuario
    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) {
      console.log('❌ Email no encontrado:', email);
      return res.status(401).json({
        error: 'Email o contraseña incorrectos'
      });
    }

    // Comparar contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      console.log('❌ Contraseña incorrecta para:', email);
      return res.status(401).json({
        error: 'Email o contraseña incorrectos'
      });
    }

    console.log('✅ Login exitoso:', { id: usuario.id, nombre: usuario.nombre });

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ============================
// OTRAS RUTAS (EJEMPLOS)
// ============================

// GET todos los usuarios (solo para testing)
app.get('/api/v1/usuarios', (req, res) => {
  res.json({
    total: usuarios.length,
    usuarios: usuarios.map(u => ({ id: u.id, nombre: u.nombre, email: u.email }))
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando' });
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ============================
// INICIAR SERVIDOR
// ============================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║    🚀 SERVIDOR INICIADO                 ║
╚════════════════════════════════════════╝

📍 URL Base: http://localhost:${PORT}/api/v1

📝 Endpoints Disponibles:
  ✅ POST /api/v1/auth/registro
  ✅ POST /api/v1/auth/login
  ✅ GET  /api/v1/usuarios (testing)
  ✅ GET  /health (check)

💡 Usuario de prueba:
  Email: admin@test.com
  Contraseña: admin123

📊 Base de datos: En memoria (se reinicia al reiniciar el servidor)

🔗 Conectada al frontend en: http://localhost:5187

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Presiona Ctrl+C para detener el servidor
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});

process.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Puerto ${PORT} ya está en uso`);
  } else {
    console.error('Error:', err);
  }
});
