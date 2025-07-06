import CartSummary from "../../Components/CartSummary/CartSummary.jsx";
import styles from "./styles.module.css";
import PaymentOptionButton from "../../Components/UI/PaymentOptionButton/PaymentOptionButton.jsx";
import AddressForm from "../../Components/UI/AddressForm/AddressForm.jsx";
import SectionHeader from "../../Components/UI/SectionHeader/SectionHeader.jsx";
import { useCart } from "../../cart/cartContext.jsx";
import { useOrderForm } from "../../hooks/useOrderForm.js";
import { useCafe } from "../../hooks/useCafe.js";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { selectedCafe } = useCafe();
  const navigate = useNavigate();
  const {
    addressData,
    setAddressData,
    selectedPayment,
    handlePaymentSelect,
    orderError,
    setOrderError,
    isSubmitting,
    setIsSubmitting,
    validateOrder,
    submitOrder
  } = useOrderForm();

  const handleConfirmOrder = async () => {
    setOrderError('');
    
    const validationErrors = validateOrder(cart);
    if (validationErrors.length > 0) {
      setOrderError(validationErrors.join('. '));
      return;
    }

    setIsSubmitting(true);

    try {
      // Format address as string for backend
      const addressString = `${addressData.street}, ${addressData.number}${addressData.complement ? ', ' + addressData.complement : ''}, ${addressData.neighborhood}, ${addressData.city} - ${addressData.state}, CEP: ${addressData.cep}`;
      
      const orderData = {
        cafeId: selectedCafe?.id || "6865de2ede02ff78d35bc68e", // Fallback ID if selectedCafe not available
        customerAddress: addressString,
        paymentMethod: selectedPayment,
        totalPrice: parseFloat(getTotalPrice().replace(',', '.')),
        deliveryFee: 3.50,
        estimatedDeliveryTime: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes from now
      };

      console.log('Sending order data to backend:', orderData);
      const result = await submitOrder(orderData);
      
      if (result.success) {
        // Clear cart after successful order
        clearCart();
        
        // Handle successful order (redirect to success page)
        navigate("/delivery-result", {
          state: {
            success: true,
            order: result.order,
          }
        });
      }
    } catch (error) {
      setOrderError('Erro ao processar pedido. Tente novamente.');
      navigate("/delivery-result", {
        state: {
          success: false,
          error: error.message || 'Erro desconhecido',
          orderId: null,
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.checkout}>
      <div className={styles.orderForm}>
        <h3 className={styles.orderTitle}>Complete seu pedido</h3>

        <div className={styles.deliverySection}>
          <SectionHeader
            iconSrc="/Icons/checkoutIcons/LocationIcon.svg"
            altText="Location"
            title="Endereço de Entrega"
            subTitle="Informe o endereço onde deseja receber seu pedido"
          />
          
          <AddressForm 
            addressData={addressData}
            onAddressChange={setAddressData}
          />
        </div>

        <div className={styles.paymentSection}>
          <SectionHeader
            iconSrc="/Icons/checkoutIcons/DollarIcon.svg"
            altText="Payment"
            title="Pagamento"
            subTitle="O pagamento é feito na entrega. Escolha a forma que deseja pagar"
          />

          <div className={styles.paymentOptions}>
            <PaymentOptionButton
              iconSrc="/Icons/checkoutIcons/CreditCardIcon.svg"
              altText="Credit Card"
              label="Cartão de Crédito"
              isSelected={selectedPayment === "credit"}
              onClick={() => handlePaymentSelect("credit")}
            />
            <PaymentOptionButton
              iconSrc="/Icons/checkoutIcons/DebitCardIcon.svg"
              altText="Debit Card"
              label="Cartão de Débito"
              isSelected={selectedPayment === "debit"}
              onClick={() => handlePaymentSelect("debit")}
            />
            <PaymentOptionButton
              iconSrc="/Icons/checkoutIcons/MoneyIcon.svg"
              altText="Cash"
              label="Dinheiro"
              isSelected={selectedPayment === "cash"}
              onClick={() => handlePaymentSelect("cash")}
            />
          </div>
        </div>
      </div>

      <div className={styles.cartSection}>
        <h3 className={styles.cartTitle}>Cafés selecionados</h3>
        <div className={styles.cartContainer}>
          <CartSummary 
            handleConfirmOrder={handleConfirmOrder}
            isSubmitting={isSubmitting}
          />
        </div>
        {orderError && (
          <div className={styles.errorMessage}>
            {orderError}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
