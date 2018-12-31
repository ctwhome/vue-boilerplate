/**
 * Round Number within the decimals
 * @param value
 * @param decimals
 * @return {number}
 */
export const round = (value, decimals) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};


/**
 * Calculates in percent, the change between 2 numbers.
 * e.g from 1000 to 500 = 50%
 *
 * @param oldNumber The initial value
 * @param newNumber The value that changed
 */
export const getPercentageChange = (oldNumber, newNumber) => ((oldNumber - newNumber) / oldNumber) * 100;

