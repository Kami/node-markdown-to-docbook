exports.normalizeString = function(str) {
  str = str.toLowerCase().replace(/\s+/g, '-');
  return str;
};
