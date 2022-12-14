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
import { InpuField } from '../../../components/InputField';
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

    const [addressCep, setAddressCep] = useState<string>('');
    const [addressStreet, setAddressStreet] = useState<string>('');
    const [addressNumber, setAddressNumber] = useState<string>('');
    const [addressNeighborhood, setAddressNeighborhood] = useState<string>('');
    const [addressCity, setAddressCity] = useState<string>('');
    const [addressState, setAddressState] = useState<string>('');
    const [addressComplement, setAddressComplement] = useState<string>('');

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

            <div className={styles.inputs}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>CEP</div>
                        <InpuField
                            color={data.tenant.mainColor}
                            placeholder="Digite um CEP"
                            value={addressCep}
                            onChange={value => setAddressCep(value)}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Rua</div>
                        <InpuField
                            color={data.tenant.mainColor}
                            placeholder="Digite uma Rua"
                            value={addressStreet}
                            onChange={value => setAddressStreet(value)}
                        />
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>Numero</div>
                        <InpuField
                            color={data.tenant.mainColor}
                            placeholder="Digite um numero"
                            value={addressNumber}
                            onChange={value => setAddressNumber(value)}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Bairro</div>
                        <InpuField
                            color={data.tenant.mainColor}
                            placeholder="Digite um Bairro"
                            value={addressNeighborhood}
                            onChange={value => setAddressNeighborhood(value)}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Cidade</div>
                        <InpuField
                            color={data.tenant.mainColor}
                            placeholder="Digite uma Cidade"
                            value={addressCity}
                            onChange={value => setAddressCity(value)}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Estado</div>
                        <InpuField
                            color={data.tenant.mainColor}
                            placeholder="Digite um Estado"
                            value={addressState}
                            onChange={value => setAddressState(value)}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Complemento</div>
                        <InpuField
                            color={data.tenant.mainColor}
                            placeholder="Digite um Complemento"
                            value={addressComplement}
                            onChange={value => setAddressComplement(value)}
                        />
                    </div>
                </div>

            </div>

            <div className={styles.btnArea}>
                <Button
                    color={data.tenant.mainColor}
                    label="Adicionar Endereço"
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