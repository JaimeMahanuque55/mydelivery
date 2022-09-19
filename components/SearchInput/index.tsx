import styles from './styles.module.css';

export const SearchInput = () => {

  return (
    <div className={styles.container}>
      <div className={styles.button}></div>
      <input
        type="text"
        className={styles.input}
        placeholder="Digite o nome do produto"
      />
    </div>
  )
}