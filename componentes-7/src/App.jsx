import Router from './Router'
import ProductoState from './contex/producto/producto-state'
import AuthState from './contex/auth/authState'

// Nota: Para usar Stripe, primero instala:
// npm install @stripe/react-stripe-js @stripe/js
// Luego descomenta el código de Stripe abajo

function App() {
  return (
    <AuthState>
      <ProductoState>
        <Router />
      </ProductoState>
    </AuthState>
  )
}

export default App

// ===== STRIPE SETUP (descomentar cuando tengas las dependencias instaladas) =====
// import { loadStripe } from '@stripe/js';
// import { Elements } from '@stripe/react-stripe-js';
// 
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
// 
// function App() {
//   return (
//     <AuthState>
//       <ProductoState>
//         <Elements stripe={stripePromise}>
//           <Router />
//         </Elements>
//       </ProductoState>
//     </AuthState>
//   )
// }
