import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant";

const TemporaryOneProduct: Product = {
  id: 1,
  image: '/temp/burger.png',
  categoryName: 'Tradicional',
  name: 'Texas Burger',
  price: 120,
  description: '2 Blends de carne de 150g, Queijo Cheddar,Bacon Caramelizado, Salada, Molho da casa,Pão brioche artesanal'
}

export const useApi = (tenantSlug: string) => ({

  getTenant: (): boolean | Tenant => {
    switch (tenantSlug) {
      case 'graveburger':
        return {
          slug: 'graveburger',
          name: 'GraveBurger',
          mainColor: '#f00',
          secondColor: '#0f0'
        }

        break;
      case 'gravepizza':
        return {
          slug: 'gravepizza',
          name: 'GravePizza',
          mainColor: '#00f',
          secondColor: '#ccc'
        }
        break;
      default: return false;
    }
  },
  getAllProducts: () => {
    let products = [];
    for (let q = 0; q < 10; q++) {
      products.push(TemporaryOneProduct)
    }
    return products;
  },
  getProduct: (id: string) => {
    return TemporaryOneProduct;
  }

});