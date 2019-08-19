/**
 * O 'Intl' retorna varias funções, mas como queremos usar somente
 * o 'format' fazermos a desestruturação e, a renomeamos para 'formatPrice'
 */
export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});
