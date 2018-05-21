const bcrypt = require('bcrypt');

exports.createPw = function (pw) {
  // the cost of processing the data.
  const salt = bcrypt.genSaltSync(10);
  // return hash password
  return bcrypt.hashSync(pw, salt);
};

exports.comparePw = function (pw, dbPw) {
  // compare password
  return bcrypt.compareSync(pw, dbPw);
};

exports.updatePw = function (pw, dbPw) {
  const bool = module.exports.comparePw(pw, dbPw);
  return bool ? dbPw : module.exports.createPw(pw);
};
