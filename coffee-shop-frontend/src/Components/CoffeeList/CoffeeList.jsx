import styles from './styles.module.css';
import CoffeeItem from '../CoffeeItem/CoffeeItem';

const CoffeeList = ({title, coffeeList}) => {

    return (
        <div className={styles.coffeeList}>
            <h1 className={styles.coffeeList__title}>{title}</h1>
            <div className={styles.coffeeList__items}>
                {coffeeList.map((coffeeDto, index) => (
                    <CoffeeItem key={index} coffeeDto={coffeeDto}/>
                ))}
            </div>
        </div>
        
    );
};

export default CoffeeList;