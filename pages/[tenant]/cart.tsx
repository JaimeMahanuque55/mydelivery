import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/Cart.module.css';
import { Product } from '../../types/Product';
import { Tenant } from '../../types/Tenant';
import { getCookie } from 'cookies-next'
import { User } from '../../types/User';
import { useAuthContext } from '../../contexts/auth';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { InpuField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { useFormater } from '../../libs/useFormatter';
import { CartItem } from '../../types/CartItem';

const Cart = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) setUser(data.user);
  }, []);

  const formater = useFormater();

  const [shippingInput, setShippingInput] = useState('');
  const [shippingPrice, setShippingPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const handleShippingCalc = () => {

  }

  const handleFinish = () => {

  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Sacola | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title="Sacola"
      />

      <div className={styles.productsQuantity}>x itens</div>

      <div className={styles.productList}>

      </div>
      <div className={styles.shippingArea}>
        <div className={styles.shippingTitle}>
          Calcular frete e prazo
        </div>
        <div className={styles.shippingForm}>
          <InpuField
            color={data.tenant.mainColor}
            placeholder="Digite seu frete"
            value={shippingInput}
            onChange={newValue => setShippingInput(newValue)}
          />
          <Button
            color={data.tenant.mainColor}
            label="Ok"
            onClick={handleShippingCalc}
          />
        </div>

        <div className={styles.shippingInfo}>
          <div className={styles.shippingAddress}>Rua sei la</div>
          <div className={styles.shippingTime}>
            <div className={styles.shippingTimeText}>Receba em ate 20 min</div>
            <div
              className={styles.shippingPrice}
              style={{ color: data.tenant.mainColor }}
            >
              {formater.formatPrice(shippingPrice)}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.resumeArea}>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Subtotal</div>
          <div className={styles.resumeRight}>{formater.formatPrice(subtotal)}</div>
        </div>

        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Frete</div>
          <div className={styles.resumeRight}>
            {shippingPrice > 0 ? formater.formatPrice(shippingPrice) : '--'}
          </div>
        </div>

        <div className={styles.resumeLine}></div>

        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Total</div>
          <div
            className={styles.resumeRightBig}
            style={{ color: data.tenant.mainColor }}
          >
            {formater.formatPrice(shippingPrice + subtotal)}
          </div>
        </div>
        <div className={styles.resumeButton}>
          <Button
            color={data.tenant.mainColor}
            label="Continuar"
            onClick={handleFinish}
            fill
          />
        </div>

      </div>
    </div>
  );
}

export default Cart;

type Props = {
  tenant: Tenant;
  token: string;
  user: User | null;
  cart: CartItem[]
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string);

  // Get Tenant
  const tenant = await api.getTenant();
  if (!tenant) {
    return {
      redirect: { destination: '/', permanent: false }
    }
  }

  // GET Logged User
  // const token = context.req.cookies.token;
  const token = getCookie('token', context); // I need to grab the context because it's server side
  const user = await api.authorizeToken(token as string);
  // Get Cart Products

  const cartCookie = getCookie('cart', context);
  const cart = await api.getCartProducts(cartCookie as string);

  return {
    props: {
      tenant,
      user,
      token,
      cart
    }
  }

}