import styles from './styles.module.css';

export default function PaymentOptionButton({ 
  iconSrc, 
  altText, 
  label, 
  isSelected, 
  onClick 
}) {
  return (
    <button 
      className={`${styles.paymentButton} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <img src={iconSrc} alt={altText} className={styles.paymentIcon} />
      {label}
    </button>
  );
}