import { CartItem } from "../types/CartItem";
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

export const useApi = (tenantSlug: string) => ({

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
  }

});