import api from '../config/axios';

// Crear intención de pago en el servidor
export const crearIntencePago = async (monto, descripcion) => {
  try {
    const response = await api.post('/pagos/intent-pago', {
      monto,
      descripcion
    });
    return response.data;
  } catch (error) {
    console.error('Error creando intent de pago:', error);
    throw error;
  }
};

// Procesar pago completo
export const procesarPago = async (metodoPago, datosCompra) => {
  try {
    const response = await api.post('/pagos/procesar', {
      metodoPago,
      ...datosCompra
    });
    return response.data;
  } catch (error) {
    console.error('Error procesando pago:', error);
    throw error;
  }
};

// Confirmar pago del cliente
export const confirmarPagoCliente = async (paymentIntentId) => {
  try {
    const response = await api.post('/pagos/confirmar', {
      paymentIntentId
    });
    return response.data;
  } catch (error) {
    console.error('Error confirmando pago:', error);
    throw error;
  }
};

// Crear orden después de pago exitoso
export const crearOrden = async (datosOrden) => {
  try {
    const response = await api.post('/ordenes/crear', {
      ...datosOrden
    });
    return response.data;
  } catch (error) {
    console.error('Error creando orden:', error);
    throw error;
  }
};
