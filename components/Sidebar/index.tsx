import styles from './styles.module.css';

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.area}>
        <div className={styles.header}>
          <div className={styles.loginArea}>...</div>
          <div className={styles.closeBtn}>x</div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.menu}>...</div>
      </div>
    </div>
  )
}

export default Sidebar;