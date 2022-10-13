import { Tenant } from "../types/Tenant";


export const useApi = () => ({

  getTenant: (tenantSlug: string): boolean | Tenant => {
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


  }
});