import styles from './styles.module.css';

type Props = {
  color: string;
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  password?: boolean;
}

export const InpuField = ({ color, placeholder, onChange, value, password }: Props) => {

  return (
    <div className={styles.container}>
      <input
        type={password ? 'password' : 'text'}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}