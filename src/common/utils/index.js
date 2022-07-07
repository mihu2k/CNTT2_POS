export function numberWithCommas(number, separate = '.') {
  return number
    ?.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separate);
}
