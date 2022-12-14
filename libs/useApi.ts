import { Address } from "../types/Address";
import { CartItem } from "../types/CartItem";
import { Order } from "../types/Order";
import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant";
import { User } from "../types/User";

const TemporaryOneProduct: Product = {
  id: 1,
  image: '/temp/burger.png',
  categoryName: 'Tradicional',
  name: 'Texas Burger',
  price: 120,
  description: '2 Blends de carne de 150g, Queijo Cheddar,Bacon Caramelizado, Salada, Molho da casa,Pão brioche artesanal'
}

const TEMPORARYorder: Order = {
  id: 123,
  status: 'preparing',
  orderDate: '2022-12-21',
  userid: '123',
  shippingAddress: {
    id: 2,
    street: 'Lagoa Azul',
    number: '200',
    cep: '11223344',
    city: 'Maputo',
    neighborhood: 'Alto-Mae',
    state: 'MPT'
  },
  shippingPrice: 50,
  paymentType: 'card',
  cupom: 'SALV',
  cupomDiscount: 50,
  products: [
    { product: { ...TemporaryOneProduct, id: 1 }, qt: 1 },
    { product: { ...TemporaryOneProduct, id: 2 }, qt: 1 },
    { product: { ...TemporaryOneProduct, id: 3 }, qt: 1 },
  ],
  subtotal: 200,
  total: 200
}

export const useApi = (tenantSlug?: string) => ({

  getTenant: async () => {
    switch (tenantSlug) {
      case 'graveburger':
        return {
          slug: 'graveburger',
          name: 'GraveBurger',
          mainColor: '#fb9400',
          secondColor: '#fff9f2'
        }

        break;
      case 'gravepizza':
        return {
          slug: 'gravepizza',
          name: 'GravePizza',
          mainColor: '#6ab70a',
          secondColor: '#e0e0e0'
        }
        break;
      default: return false;
    }
  },

  getAllProducts: async () => {
    let products = [];
    for (let q = 0; q < 10; q++) {
      products.push({
        ...TemporaryOneProduct,
        id: q + 1
      });
    }
    return products;
  },
  getProduct: async (id: number) => {
    return { ...TemporaryOneProduct, id };
  },

  authorizeToken: async (token: string): Promise<User | false> => {
    if (!token) return false;

    return {
      name: 'Jaime',
      email: 'jaimemahanuque55@gmail.com'
    }
  },
  getCartProducts: async (cartCookie: string) => {
    let cart: CartItem[] = [];
    if (!cartCookie) return cart;

    const cartJson = JSON.parse(cartCookie);
    for (let i in cartJson) {
      if (cartJson[i].id && cartJson[i].qt) {
        const product = {
          ...TemporaryOneProduct,
          id: cartJson[i].id
        };
        cart.push({
          qt: cartJson[i].qt,
          product
        });
      }
    }
    return cart;
  },

  getUserAddresses: async (email: string) => {
    const addresses: Address[] = [];

    for (let i = 0; i < 9; i++) {
      addresses.push({
        id: i + 1,
        street: 'Rua das flores',
        number: `${i + 1}00`,
        cep: '999999999',
        city: 'Matola',
        neighborhood: 'Liberdade',
        state: 'MPT'
      });
    }

    return addresses;
  },

  getUserAddress: async (addressid: number) => {
    let address: Address = {
      id: addressid,
      street: 'Rua das flores',
      number: `${addressid}00`,
      cep: '999999999',
      city: 'Matola',
      neighborhood: 'Liberdade',
      state: 'MPT'

    }

    return address;
  },

  addUserAddress: async (address: Address) => {
    console.log(address)
    return { ...address, id: 2 }
  },

  editUserAddress: async (newAddressData: Address) => {

    return true;
  },

  deleteUserAddress: async (addressId: number) => {

    return true;
  },

  getShippingPrice: async (address: Address) => {
    return 9.16;
  },
  setOrder: async (
    address: Address,
    paymentType: 'money' | 'card',
    paymentChange: number,
    cupom: string,
    cart: CartItem[]
  ) => {

    return TEMPORARYorder;
  },

  getOrder: async (orderid: number) => {

    return TEMPORARYorder;
  }

});