export const useFormater = () => ({
  formatPrice: (price: number) => {
    return price.toLocaleString('pt-br', {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'MZN'
    })
  },
  formatQuantity: (qt: number, mindigits: number) => {
    if (qt.toString().length >= mindigits) return qt.toString();

    const remain = mindigits - qt.toString().length;
    return `${'0'.repeat(remain)}${qt}`;




    // if (qt < 10) {
    //   return `${'0'.repeat(mindigits)}${qt}`;
    // } else {
    //   return qt;
    // }
  }
})