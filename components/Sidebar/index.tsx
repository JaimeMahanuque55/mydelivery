import { useRouter } from 'next/router';
import { useAuthContext } from '../../contexts/auth';
import { Tenant } from '../../types/Tenant';
import { Button } from '../Button';
import { SidebarMenuItem } from '../SidebarMenuItem';
import styles from './styles.module.css';

type Props = {
  tenant: Tenant;
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ tenant, open, onClose }: Props) => {

  const { user } = useAuthContext();

  const router = useRouter();
  return (
    <div
      className={styles.container}
      style={{
        width: open ? '100vw' : '0'
      }}
    >
      <div className={styles.area}>
        <div className={styles.header}>
          <div
            className={styles.loginArea}
            style={{ borderBottomColor: tenant.mainColor }}
          >
            {user &&
              <div className={styles.userInfo}>
                <strong>{user.name}</strong>
                Ultimo Pedido a x semanas
              </div>
            }
            {!user &&
              <Button
                color={tenant.mainColor}
                label="Fazer Login"
                onClick={() => router.push(`/${tenant.slug}/login`)}
                fill
              />
            }
          </div>
          <div
            className={styles.closeBtn}
            style={{ color: tenant.mainColor }}
            onClick={onClose}
          >
            x
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.menu}>
          <SidebarMenuItem
            color={'#6a7d8b'}
            icon="menu"
            label="Cardapio"
            onClick={() => { }}
          />
          <SidebarMenuItem
            color={'#6a7d8b'}
            icon="cart"
            label="Sacola"
            onClick={() => { }}
          />
          <SidebarMenuItem
            color={'#6a7d8b'}
            icon="fav"
            label="Favoritos"
            onClick={() => { }}
            disabled
          />
          <SidebarMenuItem
            color={'#6a7d8b'}
            icon="order"
            label="Meus Pedidos"
            onClick={() => { }}
          />
          <SidebarMenuItem
            color={'#6a7d8b'}
            icon="config"
            label="Configuracoes"
            onClick={() => { }}
            disabled
          />
        </div>
        <div className={styles.menuBottom}>
          {user &&
            <SidebarMenuItem
              color={'#6a7d8b'}
              icon="logout"
              label="Sair"
              onClick={() => { }}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar;