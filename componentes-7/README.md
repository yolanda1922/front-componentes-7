# 🛍️ Frontend E-commerce - React + Vite

Aplicación de e-commerce completa con sistema de carrito, autenticación y pasarela de pago Stripe.

## ✨ Características

- ✅ **Autenticación:** Login y registro de usuarios
- ✅ **Catálogo de Productos:** Grid responsive con 8 productos
- ✅ **Carrito de Compras:** Agregar, editar y eliminar productos
- ✅ **Checkout:** Formulario de información de envío
- ✅ **Pagos con Stripe:** Integración segura de pagos
- ✅ **Confirmación de Orden:** Página de éxito post-pago
- ✅ **Responsive:** Compatible con móviles y desktops
- ✅ **Context API + useReducer:** Gestión de estado global

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
npm install
```

**Dependencias principales:**
- react@19.2.0
- react-router-dom@7.13.0
- axios@1.13.5
- @stripe/react-stripe-js (por instalar)
- @stripe/js (por instalar)

### 2. Instalar Stripe (si no está instalado)

```bash
npm install @stripe/react-stripe-js @stripe/js
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:3000/api/v1

# Stripe Configuration
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_STRIPE_PUBLIC_KEY_HERE
```

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto siguiente disponible)

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Checkout/
│   │   └── CheckoutForm.jsx      # Formulario de pago con Stripe
│   └── Layout/
│       ├── Header.jsx            # Navegación y carrito
│       ├── Footer.jsx            # Pie de página
│       └── index.jsx             # Layout principal
├── contex/
│   ├── auth/                     # Contexto de autenticación
│   │   ├── authContext.jsx
│   │   ├── authReducer.jsx
│   │   └── authState.jsx
│   └── producto/                 # Contexto de carrito
│       ├── producto-context.jsx
│       ├── producto-reducer.jsx
│       └── producto-state.jsx
├── pages/
│   ├── Cart.jsx                  # Página del carrito
│   ├── Checkout.jsx              # Página de checkout
│   ├── Login.jsx                 # Login
│   ├── Register.jsx              # Registro
│   └── OrderConfirmation.jsx     # Confirmación post-pago
├── services/
│   ├── authService.js            # API de autenticación
│   ├── stripeService.js          # API de pagos
│   └── producto-service.js       # API de productos
├── config/
│   └── axios.js                  # Configuración de axios
├── App.jsx                       # Componente raíz con providers
├── Router.jsx                    # Definición de rutas
├── main.jsx                      # Punto de entrada
└── index.css                     # Estilos globales
```

## 🔄 Flujo de Compra

```
1. Home (/home)
   ↓ Agregar producto al carrito
2. Header muestra contador
   ↓ Click en carrito
3. Cart (/carrito)
   ↓ Revisar y editar
4. Checkout (/checkout)
   ↓ Llenar información
5. CheckoutForm
   ↓ Procesar pago
6. OrderConfirmation (/orden-confirmada)
   ↓ Ver detalles de orden
```

## 🔐 Autenticación

El sistema requiere autenticación para completar compras:

1. **Login:** `/login` - Inicia sesión con email y contraseña
2. **Registro:** `/registro` - Crea nueva cuenta
3. **Token Bearer:** Se envía automáticamente en cada solicitud al backend

**Endpoints requeridos:**
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/registro`

Ver [AUTH_GUIDE.md](./AUTH_GUIDE.md) para más detalles.

## 💳 Pagos con Stripe

La integración de Stripe maneja:

1. **Payment Intent Creation** - Crear intención de pago en servidor
2. **Card Element** - Formulario seguro de tarjeta de crédito
3. **Payment Confirmation** - Confirmar pago completado

**Configuración requerida:**
1. Obtener claves de https://dashboard.stripe.com
2. Configurar `VITE_STRIPE_PUBLIC_KEY` en `.env`
3. Backend debe implementar endpoints de Stripe

Ver [STRIPE_GUIDE.md](./STRIPE_GUIDE.md) para instrucciones completas.

## 📋 Rutas Disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Home | Página principal con productos |
| `/home` | Home | Alias para página principal |
| `/about` | About | Página de información |
| `/contact` | Contact | Página de contacto |
| `/login` | Login | Formulario de login |
| `/registro` | Register | Formulario de registro |
| `/carrito` | Cart | Carrito de compras |
| `/checkout` | Checkout | Página de checkout |
| `/orden-confirmada` | OrderConfirmation | Confirmación de orden |

## 🎯 Opciones de npm

```bash
npm run dev        # Iniciar servidor de desarrollo
npm run build      # Compilar para producción
npm run preview    # Vista previa de build
npm run lint       # Ejecutar linter
npm run dev:watch  # Dev con hot reload usando nodemon
```

## 🛠️ Tecnologías

- **React 19.2.0** - UI framework
- **Vite 7.3.1** - Build tool
- **React Router 7.13.0** - Routing
- **Axios 1.13.5** - HTTP client
- **Stripe.js** - Procesamiento de pagos
- **Context API** - State management
- **useReducer** - Complex state logic

## 📚 Documentación Adicional

- [CART_AND_PAYMENT_GUIDE.md](./CART_AND_PAYMENT_GUIDE.md) - Guía completa de carrito y pagos
- [STRIPE_GUIDE.md](./STRIPE_GUIDE.md) - Configuración de Stripe
- [AUTH_GUIDE.md](./AUTH_GUIDE.md) - Sistema de autenticación
- [ENDPOINTS_CONFIG.md](./ENDPOINTS_CONFIG.md) - Especificación de endpoints API
- [CONEXION_BACKEND.md](./CONEXION_BACKEND.md) - Conexión al backend

## ⚙️ Configuración Backend Requerida

El servidor backend debe implementar estos endpoints:

```
POST /api/v1/auth/login
POST /api/v1/auth/registro
POST /api/v1/pagos/intent-pago
POST /api/v1/ordenes/crear
GET  /api/v1/productos (opcional)
```

Ver [ENDPOINTS_CONFIG.md](./ENDPOINTS_CONFIG.md) para detalles técnicos.

## 🔒 Seguridad

- ✅ Tokens JWT en localStorage
- ✅ Bearer token en headers de API
- ✅ Stripe maneja datos sensibles de tarjetas
- ✅ Validación en cliente y servidor
- ✅ Protección CORS configurada

## 🐛 Debugging

**Modo desarrollo:**
- Abre F12 en el navegador
- Pestaña Console para logs
- Pestaña Network para solicitudes API
- Redux DevTools (opcional)

**Logs de Axios:**
```javascript
// Los interceptores registran:
// - Solicitudes outgoing
// - Respuestas recibidas
// - Errores de red
```

## ✅ Checklist de Implementación

Backend:
- [ ] Instalar @stripe/react-stripe-js y @stripe/js
- [ ] Obtener claves de Stripe
- [ ] Configurar VITE_STRIPE_PUBLIC_KEY en .env
- [ ] Implementar endpoints de auth (login/registro)
- [ ] Implementar endpoint de Payment Intent
- [ ] Implementar endpoint de crear ordenes
- [ ] Implementar endpoint GET productos (opcional)
- [ ] Probar flujo completo de compra
- [ ] Pasar a claves en vivo de Stripe

## 💡 Tips de Desarrollo

1. **Usar tarjetas de prueba de Stripe:**
   - `4242 4242 4242 4242` - Pago exitoso
   - `4000 0000 0000 0002` - Pago rechazado

2. **Limpiar estado:**
   ```bash
   localStorage.clear()  # En console del navegador
   ```

3. **Ver contexto actual:**
   ```javascript
   // En cualquier componente:
   const { state } = useContext(ProductoContext);
   console.log(state);
   ```

## 📞 Soporte y Contacto

Para problemas o preguntas:
- Revisa los archivos de documentación en la raíz
- Consulta la consola del navegador (F12)
- Verifica los logs de Stripe en dashboard.stripe.com
- Contacta al equipo de desarrollo

## 📄 Licencia

Este proyecto es un template educativo de e-commerce.

---

**Última actualización:** Febrero 2026
