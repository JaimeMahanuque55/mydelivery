import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/Home.module.css';
import { Tenant } from '../../types/Tenant';

const Login = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | {data.tenant.name}</title>
      </Head>
    </div>
  );
}

export default Login;

type Props = {
  tenant: Tenant
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi();

  // Get Tenant
  const tenant = await api.getTenant(tenantSlug as string);
  if (!tenant) {
    return {
      redirect: { destination: '/', permanent: false }
    }
  }

  return {
    props: {
      tenant
    }
  }

}