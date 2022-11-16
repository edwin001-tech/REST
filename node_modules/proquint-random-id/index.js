var crypto = require("crypto"),
    proquint = require("proquint");

var proquintRandomId = module.exports = function proquintRandomId(length) {
  return proquint.encode(crypto.randomBytes(length || 6));
};
