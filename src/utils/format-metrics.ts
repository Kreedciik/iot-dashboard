export const formatMetrics = (value: null | undefined | number, symb: string) => {
  if (!value) return '-';
  return `${value}${symb}`;
};
