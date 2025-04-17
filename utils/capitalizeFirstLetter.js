/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export default capitalizeFirstLetter;
