import styles from './styles.module.css';
import EyeOn from './EyeOn.svg';
import EyeOff from './EyeOff.svg';
import { useState } from 'react';


type Props = {
  color: string;
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  password?: boolean;
}

export const InpuField = ({ color, placeholder, onChange, value, password }: Props) => {

  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassowrd] = useState(false);

  return (
    <div
      className={styles.container}
      style={{
        borderColor: focused ? color : '#f9f9fb',
        backgroundColor: focused ? 'transparent' : ''
      }}
    >
      <input
        type={password ? (showPassword ? 'text' : 'password') : 'text'}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {password &&
        <div
          className={styles.showPassword}
          onClick={() => setShowPassowrd(!showPassword)}
        >
          {showPassword && <EyeOn color="#bbb" />}
          {!showPassword && <EyeOff color="#bbb" />}
        </div>
      }
    </div>
  )
}