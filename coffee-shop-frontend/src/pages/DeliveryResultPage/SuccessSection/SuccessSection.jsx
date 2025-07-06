import styles from "./styles.module.css";

const SuccessSection = ({ order }) => {
  console.log('SuccessSection - received order:', order);

  // Helper function to format payment method
  const formatPaymentMethod = (method) => {
    const paymentMethods = {
      'credit': 'Cartão de Crédito',
      'debit': 'Cartão de Débito',
      'cash': 'Dinheiro'
    };
    return paymentMethods[method] || method;
  };

  // Helper function to format delivery time
  const formatDeliveryTime = (estimatedTime) => {
    if (!estimatedTime) return '20 min - 30 min';
    
    const deliveryDate = new Date(estimatedTime);
    const now = new Date();
    const diffMinutes = Math.ceil((deliveryDate - now) / (1000 * 60));
    
    if (diffMinutes <= 0) return 'Em breve';
    if (diffMinutes <= 60) return `${diffMinutes} min`;
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
  };

  // Default values if order is not available
  const customerAddress = order?.customerAddress || 'Endereço não disponível';
  const paymentMethod = formatPaymentMethod(order?.paymentMethod);
  const deliveryTime = formatDeliveryTime(order?.estimatedDeliveryTime);
  const orderId = order?.id || 'N/A';

  return (
    <div className={styles.successSection}>
      <div className={styles.textSection}>
        <h3 className={styles.title}>Uhu! Pedido confirmado</h3>
        <p className={styles.subTitle}>Agora é só aguardar que logo o café chegará até você</p>
        {orderId !== 'N/A' && (
          <p className={styles.orderNumber}>Pedido #{orderId}</p>
        )}
      </div>
      <div className={styles.infoSection}>
        <div className={styles.deliveryInfo}>
          <div className={styles.deliveryAddress}>
            <img src="Icons/successPage/LocationIcon.svg" alt="location" />
            <p className="deliveryAddressText">
              Entrega em <strong>{customerAddress}</strong>
            </p>
          </div>
          <div className={styles.deliveryTime}>
            <img src="Icons/successPage/TimeIcon.svg" alt="time" />
            <p className="deliveryAddressText"> 
              Previsão de entrega <strong>{deliveryTime}</strong>
            </p>
          </div>
          <div className={styles.deliveryPayment}>
            <img src="Icons/successPage/MoneyIcon.svg" alt="payment" />
            <p className="deliveryAddressText"> 
              Pagamento na entrega <strong>{paymentMethod}</strong>
            </p>
          </div>
        </div>
        <img src="Illustration.svg" alt="Ilustração de sucesso" className={styles.illustration} />
      </div>
    </div>
  );
};

export default SuccessSection;
