import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../contexts/app';
import { useApi } from '../../../libs/useApi';
import styles from '../../../styles/Order-id.module.css';
import { Product } from '../../../types/Product';
import { Tenant } from '../../../types/Tenant';
import { getCookie, setCookie } from 'cookies-next'
import { User } from '../../../types/User';
import { useAuthContext } from '../../../contexts/auth';
import Head from 'next/head';
import { Header } from '../../../components/Header';
import { InpuField } from '../../../components/InputField';
import { Button } from '../../../components/Button';
import { useFormater } from '../../../libs/useFormatter';
import { CartItem } from '../../../types/CartItem';
import { useRouter } from 'next/router';
import { CartProductItem } from '../../../components/CartProductItem';
import { CartCookie } from '../../../types/CartCookie';
import { ButtonWithIcon } from '../../../components/ButtonWithIcon';
import { Address } from '../../../types/Address';
import { Order } from '../../../types/Order';

const OrderID = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) setUser(data.user);
  }, []);

  const formater = useFormater();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Pedido #{data.order.id} | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title={`Pedido #${data.order.id}`}
      />

      <div className={styles.infoGroup}>

        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Endereço</div>
          <div className={styles.infoBody}>
            <ButtonWithIcon
              color={data.tenant.mainColor}
              leftIcon={"location"}
              rightIcon={"rightArrow"}
              value={`${data.order.shippingAddress.street} ${data.order.shippingAddress.number} - ${data.order.shippingAddress.city}`}
              onClick={() => { }}
            />
          </div>
        </div>

        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Tipo de Pagamento</div>
          <div className={styles.infoBody}>
            <div className={styles.paymentTypes}>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  leftIcon="money"
                  value='Dinheiro'
                  onClick={() => { }}
                  fill={data.order.paymentType === 'money'}
                />
              </div>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  leftIcon="card"
                  value='Cartão'
                  onClick={() => { }}
                  fill={data.order.paymentType === 'card'}
                />
              </div>

            </div>
          </div>
        </div>

        {data.order.paymentType === 'money' &&
          <div className={styles.infoArea}>
            <div className={styles.infoTitle}>Troco</div>
            <div className={styles.infoBody}>
              <InpuField
                color={data.tenant.mainColor}
                placeholder="Quanto você tem em dinheiro"
                value={data.order.paymentChange?.toString() ?? ''}
                onChange={() => { }}
              />
            </div>
          </div>
        }

        {data.order.cupom &&
          <div className={styles.infoArea}>
            <div className={styles.infoTitle}>Cupom de desconto</div>
            <div className={styles.infoBody}>
              <ButtonWithIcon
                color={data.tenant.mainColor}
                leftIcon="cupom"
                rightIcon='checked'
                value={data.order.cupom.toUpperCase()}
              />

            </div>
          </div>
        }

      </div>

      <div className={styles.productsQuantity}>{data.order.products.length} {data.order.products.length === 1 ? 'item' : 'itens'}</div>

      <div className={styles.productList}>
        {data.order.products.map((cartItem, index) => (
          <CartProductItem
            key={index}
            color={data.tenant.mainColor}
            quantity={cartItem.qt}
            product={cartItem.product}
            onChange={() => { }}
            noEdit
          />
        ))}
      </div>

      <div className={styles.resumeArea}>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Subtotal</div>
          <div className={styles.resumeRight}>{formater.formatPrice(data.order.subtotal)}</div>
        </div>

        {data.order.cupomDiscount &&
          <div className={styles.resumeItem}>
            <div className={styles.resumeLeft}>Desconto</div>
            <div className={styles.resumeRight}>- {formater.formatPrice(data.order.cupomDiscount)}</div>
          </div>
        }

        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Frete</div>
          <div className={styles.resumeRight}>
            {data.order.shippingPrice > 0 ? formater.formatPrice(data.order.shippingPrice) : '--'}
          </div>
        </div>

        <div className={styles.resumeLine}></div>

        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Total</div>
          <div
            className={styles.resumeRightBig}
            style={{ color: data.tenant.mainColor }}
          >
            {formater.formatPrice(data.order.total)}
          </div>
        </div>

      </div>
    </div>
  );
}

export default OrderID;

type Props = {
  tenant: Tenant;
  token: string;
  user: User | null;
  cart: CartItem[];
  order: Order;
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, orderid } = context.query;
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

  // Get Order
  const order = await api.getOrder(parseInt(orderid as string));

  return {
    props: {
      tenant,
      user,
      token,
      order
    }
  }

}