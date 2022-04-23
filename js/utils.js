export function generateRandomID (length) {
  let result = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

export function getDatesFromText(text) {
  let results = text.match(/[0-9]{1,2}([\-\/ \.])[0-9]{1,2}([\-\/ \.])((19)|(20))[0-9]{2}/g);

  if (results && results.length) {
    const isArray = Array.isArray(results);
    results = isArray ? results.toString().split(',').join(', ') : results;

    return results;
  }

  return [];
}