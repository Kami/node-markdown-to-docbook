exports.normalizeString = function(str) {
  str = str.toLowerCase().replace(/\s+/g, '-').replace(/["']/g, '').replace('/', '');
  return str;
};
