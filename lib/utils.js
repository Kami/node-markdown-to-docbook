exports.normalizeString = function(str) {
  str = str.toLowerCase().replace(/\s+/g, '-').replace(/["']/g, '');
  return str;
};
