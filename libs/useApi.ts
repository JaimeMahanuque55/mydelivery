export type getTenantResponse = {
  name: string;
  mainColor: string;
  secondColor: string;
}

export const useApi = () => ({

  getTenant: (tenantSlug: string): boolean | getTenantResponse => {
    switch (tenantSlug) {
      case 'graveburger':
        return {
          name: 'GraveBurger',
          mainColor: '#f00',
          secondColor: '#0f0'
        }

        break;
      case 'gravepizza':
        return {
          name: 'GravePizza',
          mainColor: '#00f',
          secondColor: '#ccc'
        }
        break;
      default: return false;
    }


  }
});