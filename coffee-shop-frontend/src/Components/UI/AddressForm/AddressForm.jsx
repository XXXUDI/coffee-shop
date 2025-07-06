import styles from "./styles.module.css";

export default function AddressForm({ addressData, onAddressChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onAddressChange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className={styles.addressForm}>
      <input 
        type="text" 
        name="cep"
        placeholder="CEP" 
        value={addressData.cep || ''}
        onChange={handleInputChange}
        required
      />
      <input 
        type="text" 
        name="street"
        placeholder="Rua" 
        value={addressData.street || ''}
        onChange={handleInputChange}
        required
      />
      <div className={styles.inputRow}>
        <input 
          type="text" 
          name="number"
          placeholder="Número" 
          value={addressData.number || ''}
          onChange={handleInputChange}
          required
        />
        <input 
          type="text" 
          name="complement"
          placeholder="Complemento" 
          value={addressData.complement || ''}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputRowThree}>
        <input 
          type="text" 
          name="neighborhood"
          placeholder="Bairro" 
          value={addressData.neighborhood || ''}
          onChange={handleInputChange}
          required
        />
        <input 
          type="text" 
          name="city"
          placeholder="Cidade" 
          value={addressData.city || ''}
          onChange={handleInputChange}
          required
        />
        <input 
          type="text" 
          name="state"
          placeholder="UF" 
          value={addressData.state || ''}
          onChange={handleInputChange}
          required
          maxLength="2"
        />
      </div>
    </form>
  );
}
