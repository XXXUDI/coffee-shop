import styles from './styles.module.css';

const Banner = () => {
    return (
        <div className={styles.intro}>
            <div className={styles.intro__container}>
                <div className={styles.title__container}>
                    <h1 className={styles.title__text}>Encontre o café perfeito para qualquer hora do dia</h1>
                    <p className={styles.subtitle__text}>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</p>
                </div>
                <div className={styles.item__container}>
                    <div className={styles.title__item}>
                        <img src="/Icons/cartItemIcon.svg" alt="Coffee Icon" className={styles.item__icon} />
                        <p className={styles.item__text}>Compra simples e segura</p>
                    </div>
                    <div className={styles.title__item}>
                        <img src="/Icons/boxItemIcon.svg" alt="Coffee Icon" className={styles.item__icon} />
                        <p className={styles.item__text}>Embalagem mantém o café intacto</p>
                    </div>
                    <div className={styles.title__item}>
                        <img src="/Icons/clockItemIcon.svg" alt="Coffee Icon" className={styles.item__icon} />
                        <p className={styles.item__text}>Entrega rápida e rastreada</p>
                    </div>
                    <div className={styles.title__item}>
                        <img src="/Icons/coffeeItemIcon.svg" alt="Coffee Icon" className={styles.item__icon} />
                        <p className={styles.item__text}>O café chega fresquinho até você</p>
                    </div>
                </div>
            </div>
        <img src="/Icons/Imagem.svg" alt="Coffee Delivery" className={styles.intro__image} />
    </div>
    );
};

export default Banner;