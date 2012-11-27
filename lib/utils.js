exports.normalizeString = function(str) {
  str = str.toLowerCase().replace(/\s+/g, '-').replace(/["']/g, '').replace('/', '');
  str = str.replace(/[\(\),\.]/g, '');
  return str;
};
