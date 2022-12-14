import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../contexts/app';
import { useApi } from '../../../libs/useApi';
import styles from '../../../styles/NewAddress.module.css';
import { Tenant } from '../../../types/Tenant';
import { getCookie, setCookie } from 'cookies-next'
import { User } from '../../../types/User';
import { useAuthContext } from '../../../contexts/auth';
import Head from 'next/head';
import { Header } from '../../../components/Header';
import { useFormater } from '../../../libs/useFormatter';
import { useRouter } from 'next/router';
import { Button } from '../../../components/Button';
import { Address } from '../../../types/Address';


const NewAddress = (data: Props) => {
    const { setToken, setUser } = useAuthContext();
    const { tenant, setTenant, setShippingAddress, setShippingPrice } = useAppContext();

    useEffect(() => {
        setTenant(data.tenant);
        setToken(data.token);
        if (data.user) setUser(data.user);
    }, []);

    const formater = useFormater();
    const router = useRouter();
    const api = useApi(data.tenant.slug);

    const handleNewAddress = () => {
        router.push(`/${data.tenant.slug}/newaddress/new`);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Novo Endereço | {data.tenant.name}</title>
            </Head>

            <Header
                backHref={`/${data.tenant.slug}/checkout`}
                color={data.tenant.mainColor}
                title="Novo Endereço"
            />

            <div className={styles.btnArea}>
                <Button
                    color={data.tenant.mainColor}
                    label="Novo Endereço"
                    onClick={handleNewAddress}
                    fill
                />
            </div>


        </div>
    );
}

export default NewAddress;

type Props = {
    tenant: Tenant;
    token: string;
    user: User | null;
    addresses: Address[];
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
    const token = getCookie('token', context); // I need to grab the context because it's server side
    const user = await api.authorizeToken(token as string);
    if (!user) {
        return { redirect: { destination: '/login', permanent: false } }
    }

    // Get Addresses from logged User
    const addresses = await api.getUserAddresses(user.email);


    return {
        props: {
            tenant,
            user,
            token,
            addresses
        }
    }

}