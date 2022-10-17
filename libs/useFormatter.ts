export const useFormater = () => ({
  formatPrice: (price: number) => {
    return price.toLocaleString('pt-br', {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'MZN'
    })
  },
  formatQuantity: (qt: number, digits: number) => {
    if (qt < 10) {
      return `${'0'.repeat(digits)}${qt}`;
    } else {
      return qt;
    }
  }
})