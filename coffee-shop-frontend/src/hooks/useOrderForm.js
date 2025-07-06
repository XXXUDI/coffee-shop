import { useState } from 'react';
import OrderService from '../api/orderService';
// import { orderService } from '../services/orderService.js';

export const useOrderForm = () => {
  const [addressData, setAddressData] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });
  
  const [selectedPayment, setSelectedPayment] = useState('');
  const [orderError, setOrderError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateOrder = (cart) => {
    const errors = [];

    // Validate address
    const requiredAddressFields = ['cep', 'street', 'number', 'neighborhood', 'city', 'state'];
    const missingFields = requiredAddressFields.filter(field => !addressData[field]?.trim());
    
    if (missingFields.length > 0) {
      errors.push('Preencha todos os campos obrigatórios do endereço');
    }

    // Validate payment method
    if (!selectedPayment) {
      errors.push('Selecione uma forma de pagamento');
    }

    // Validate cart
    if (cart.length === 0) {
      errors.push('Adicione itens ao carrinho');
    }

    return errors;
  };

  const clearError = () => {
    setOrderError('');
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
    clearError();
  };

  const submitOrder = async (orderData) => {
    try {
      console.log("Sending order to backend:", orderData);
      const orderService = new OrderService();
      const res = await orderService.createOrder(orderData);
      console.log("Order created successfully:", res);
      return { success: true, order: res};
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  return {
    addressData,
    setAddressData,
    selectedPayment,
    handlePaymentSelect,
    orderError,
    setOrderError,
    isSubmitting,
    setIsSubmitting,
    validateOrder,
    clearError,
    submitOrder
  };
};
