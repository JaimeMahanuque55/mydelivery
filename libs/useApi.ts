export type getTenantResponse = {
  name: string;
  mainColor: string;
  secondColor: string;
}

export const UseApi = () => ({

  getTenant: (tenantSlug: string): boolean | getTenantResponse => {
    switch (tenantSlug) {
      case 'graveburger':
        return {
          name: 'GraveBurger',
          mainColor: '#0f0',
          secondColor: '#ccc'
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