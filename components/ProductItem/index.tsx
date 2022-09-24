import styles from './styles.module.css';

export const ProductItem = () => {
  return (
    <div className={styles.container}>
      <div className={styles.head}></div>
      <div className={styles.info}>
        <div className={styles.img}>
          <img src="/temp/burger.png" alt="" />
        </div>
        <div className={styles.catName}>Tradicional</div>
        <div className={styles.name}>Texas Burger</div>
        <div className={styles.price}>MZN 120</div>
      </div>
    </div>
  )
}