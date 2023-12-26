export const formatPrice = (value: number) => {
  const str = (value || 0).toString()
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
