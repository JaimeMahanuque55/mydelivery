import { Address } from '../../types/Address';
import { Icon } from '../Icon';
import styles from './styles.module.css';

type Props = {
  color: string;
  address: Address;
  onSelect: (address: Address) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  menuOpened: number;
  setMenuOpened: (id: number) => void;
}

export const AddressItem = ({ color, address, onSelect, onEdit, onDelete, menuOpened, setMenuOpened }: Props) => {

  return (
    <div className={styles.container}>
      <div className={styles.addressArea} onClick={() => onSelect(address)}>
        <div className={styles.addressIcon}>
          <Icon
            color={color}
            icon='location'
            width={24}
            height={24}
          />
        </div>
        <div className={styles.addressText}>{`${address.street}, ${address.number}, ${address.city} ${address.number}, ${address.city} `}</div>
      </div>
      <div className={styles.btnArea}>
        <div className={styles.menuIcon} onClick={() => setMenuOpened(address.id)}>
          <Icon
            color='#6a7d8b'
            icon='dots'
            width={24}
            height={24}
          />
        </div>
        {menuOpened === address.id &&
          <div className={styles.popup}>OK</div>
        }

      </div>
    </div>
  )
}