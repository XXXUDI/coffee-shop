import { useCart } from "../../cart/cartContext";
import { Tag } from "../UI/Tag/Tag";
import styles from "./styles.module.css";
import { useState } from "react";

// image, name, description, tags, price
const CoffeeItem = ({coffeeDto}) => {

    const [count, setCount] = useState(1);
    const cart = useCart();

    const handleIncrease = () => {
        setCount(prevCount => prevCount + 1);
     }

    const handleDecrease = () => {
        setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    }

    const handleAddToCart = () => {
        cart.addToCart(coffeeDto, count);
        setCount(1);
        console.log(`Added ${count} of ${coffeeDto.name} to cart`);
    }

  return (
    <div className={styles.coffee__cart}>
      <img
        src={coffeeDto.image}
        alt={coffeeDto.name}
        className={styles.coffee__image}
      />
      <div className={styles.tags}>
        {coffeeDto.tags.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </div>
      <div className={styles.coffee__info}>
        <p className={styles.coffee__name}>{coffeeDto.name}</p>
        <p className={styles.coffee__description}>
          {coffeeDto.description}
        </p>
      </div>
      <div className={styles.coffee__buy}>
        <div className={styles.coffee__price__info}>
          <p className={styles.coffee__currency}>R$</p>
          <p className={styles.coffee__price}>{coffeeDto.price}</p>
        </div>
        <div className={styles.coffee__actions}>
          <div className={styles.counter}>
            <img src="/Icons/Minus.svg" alt="Decrease" className={styles.counter__icon} onClick={handleDecrease} />
            <p className={styles.counter__number}>{count}</p>
            <img src="/Icons/Plus.png" alt="Increase" className={styles.counter__icon} onClick={handleIncrease} />
          </div>
          <button className={styles.coffee__button} onClick={handleAddToCart}>
            <img
              src="/Icons/ShoppingCartSimple.svg"
              alt="Add to Cart"
              className={styles.coffee__cartIcon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeItem;
