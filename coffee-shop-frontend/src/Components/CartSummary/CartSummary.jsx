import { useCart } from '../../cart/cartContext';
import React from 'react';
import styles from './styles.module.css';

const CartSummary = ({handleConfirmOrder, isSubmitting = false}) => {

    const { 
        cart, 
        getTotalPrice,
        removeFromCart,
        updateItemCount
    } = useCart();

    const totalPrice = getTotalPrice();
    const deliveryFee = "3,50";
    const finalTotal = (parseFloat(totalPrice.replace(',', '.')) + parseFloat(deliveryFee.replace(',', '.'))).toFixed(2).replace('.', ',');

    if (cart.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <p>Seu carrinho está vazio</p>
            </div>
        );
    }

    return (
        <div className={styles.cartSummary}>
            <div className={styles.cartItems}>
                {cart.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            className={styles.itemImage}
                        />
                        <div className={styles.itemDetails}>
                            <div className={styles.itemInfo}>
                                <h4 className={styles.itemName}>{item.name}</h4>
                                <div className={styles.itemActions}>
                                    <div className={styles.itemControls}>
                                        <button 
                                            onClick={() => updateItemCount(item.id, item.count - 1)}
                                            className={styles.controlButton}
                                        >
                                            <img src="/Icons/Minus.svg" alt="Decrease" />
                                        </button>
                                        <span className={styles.itemCount}>{item.count}</span>
                                        <button 
                                            onClick={() => updateItemCount(item.id, item.count + 1)}
                                            className={styles.controlButton}
                                        >
                                            <img src="/Icons/Plus.png" alt="Increase" />
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className={styles.removeButton}
                                    >
                                        REMOVER
                                    </button>
                                </div>
                            </div>
                            <div className={styles.itemPrice}>
                                R$ {item.price}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.orderSummary}>
                <div className={styles.summaryRow}>
                    <span>Total de itens</span>
                    <span>R$ {totalPrice}</span>
                </div>
                <div className={styles.summaryRow}>
                    <span>Entrega</span>
                    <span>R$ {deliveryFee}</span>
                </div>
                <div className={styles.summaryTotal}>
                    <strong>Total</strong>
                    <strong>R$ {finalTotal}</strong>
                </div>
                <button 
                    className={styles.confirmButton} 
                    onClick={() => handleConfirmOrder()}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'PROCESSANDO...' : 'CONFIRMAR PEDIDO'}
                </button>
            </div>
        </div>
    );
};

export default CartSummary;

