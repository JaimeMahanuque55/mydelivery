import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../contexts/app';
import { useApi } from '../../../libs/useApi';
import styles from '../../../styles/NewAddress.module.css';
import { Tenant } from '../../../types/Tenant';
import { getCookie } from 'cookies-next'
import { User } from '../../../types/User';
import { useAuthContext } from '../../../contexts/auth';
import Head from 'next/head';
import { Header } from '../../../components/Header';
import { InpuField } from '../../../components/InputField';
import { useFormater } from '../../../libs/useFormatter';
import { useRouter } from 'next/router';
import { Button } from '../../../components/Button';
import { Address } from '../../../types/Address';


const EditAddress = (data: Props) => {
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

  const [errorFields, setErrorFields] = useState<string[]>([]);

  const [address, setAddress] = useState<Address>(data.address);

  const changeAddressField = (
    field: keyof Address,
    value: typeof address[keyof Address]
  ) => {
    setAddress({ ...address, [field]: value });
  }



  const verifyAddress = () => {
    let newErrorFields = [];
    let approved = true;

    if (address.cep.replaceAll(/[^0-9]/g, '').length !== 8) {
      newErrorFields.push('cep');
      approved = false;
    }
    if (address.street.length <= 1) {
      newErrorFields.push('street');
      approved = false;
    }
    if (address.neighborhood.length <= 1) {
      newErrorFields.push('neighborhood');
      approved = false;
    }
    if (address.city.length <= 1) {
      newErrorFields.push('city');
      approved = false;
    }
    if (address.state.length <= 2) {
      newErrorFields.push('state');
      approved = false;
    }

    setErrorFields(newErrorFields)
    return approved;
  }

  const handleSaveAddress = async () => {
    if (verifyAddress()) {
      await api.editUserAddress(address);

      router.push(`/${data.tenant.slug}/myaddresses`);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Editar Endere??o | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}/myaddresses`}
        color={data.tenant.mainColor}
        title="Editar Endere??o"
      />

      <div className={styles.inputs}>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>CEP</div>
            <InpuField
              color={data.tenant.mainColor}
              placeholder="Digite um CEP"
              value={address.cep}
              onChange={value => changeAddressField('cep', value)}
              warning={errorFields.includes('cep')}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>Rua</div>
            <InpuField
              color={data.tenant.mainColor}
              placeholder="Digite uma Rua"
              value={address.street}
              onChange={value => changeAddressField('street', value)}
              warning={errorFields.includes('street')}
            />
          </div>
          <div className={styles.column}>
            <div className={styles.label}>Numero</div>
            <InpuField
              color={data.tenant.mainColor}
              placeholder="Digite um numero"
              value={address.number}
              onChange={value => changeAddressField('number', value)}
              warning={errorFields.includes('number')}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>Bairro</div>
            <InpuField
              color={data.tenant.mainColor}
              placeholder="Digite um Bairro"
              value={address.neighborhood}
              onChange={value => changeAddressField('neighborhood', value)}
              warning={errorFields.includes('neighborhood')}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>Cidade</div>
            <InpuField
              color={data.tenant.mainColor}
              placeholder="Digite uma Cidade"
              value={address.city}
              onChange={value => changeAddressField('city', value)}
              warning={errorFields.includes('city')}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>Estado</div>
            <InpuField
              color={data.tenant.mainColor}
              placeholder="Digite um Estado"
              value={address.state}
              onChange={value => changeAddressField('state', value)}
              warning={errorFields.includes('state')}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>Complemento</div>
            <InpuField
              color={data.tenant.mainColor}
              placeholder="Digite um Complemento"
              value={address.complement ?? ''}
              onChange={value => changeAddressField('complement', value)}
              warning={errorFields.includes('complement')}
            />
          </div>
        </div>

      </div>

      <div className={styles.btnArea}>
        <Button
          color={data.tenant.mainColor}
          label="Actualizar Endere??o"
          onClick={handleSaveAddress}
          fill
        />
      </div>


    </div>
  );
}

export default EditAddress;

type Props = {
  tenant: Tenant;
  token: string;
  user: User | null;
  address: Address;
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, addressid } = context.query;
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

  // Get Addresse
  const address = await api.getUserAddress(parseInt(addressid as string));
  if (!address) {
    return { redirect: { destination: '/myaddresses', permanent: false } }
  }


  return {
    props: {
      tenant,
      user,
      token,
      address
    }
  }

}