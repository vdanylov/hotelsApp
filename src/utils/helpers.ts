export const getRatingBackground = (rating: number) => {
  if (rating <= 35) return 'red'
  if (rating > 35 && rating < 89) return '#f6be00'
  if (rating > 89) return 'green'
  return 'blue'
}
