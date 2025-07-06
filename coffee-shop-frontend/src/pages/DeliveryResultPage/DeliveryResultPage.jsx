import styles from "./styles.module.css";
import SuccessSection from "./SuccessSection/SuccessSection";
import { useLocation } from "react-router-dom";

const DeliveryResultPage = () => {
  const location = useLocation();
  const { success, error, order } = location.state || {};

  console.log('DeliveryResultPage - location:', location);
  console.log('DeliveryResultPage - location.state:', location.state);
  console.log('DeliveryResultPage - success:', success, 'error:', error, 'order:', order);

  return (
    <div className={styles.deliveryResult}>
      {success ? (
        <SuccessSection order={order} />
      ) : (
        <div className={styles.errorSection}>
          <h2>Erro ao processar o pedido</h2>
          <p>{error ? `${error}. Entre em contato com o administrador do site.` : 'Ocorreu um erro desconhecido. Tente novamente mais tarde.'}</p>
        </div>
      )}
    </div>
  );
};

export default DeliveryResultPage;
