const hashPasswordHelper = require('../../helper/hashPasswordHelper');
const authHelper = require('../../helper/authHelper');

const Member = require('../member/member.model');

exports.memberLogin = (req, res, next) => {
  const loginList = {
    mem_email: req.body.email,
    mem_password: req.body.password,
  };

  const onError = (err) => {
    next(err);
  };

  const respond = (data) => {
    if (data) {
      const date = new Date().getTime();
      const tokenList = {
        id: data.mem_id,
        type: data.mem_type,
        name: data.mem_name,
        email: data.mem_email,
        profile: data.mem_profile,
        lastLoginedAt: date,
        // ...
      };
      const updateList = {
        mem_lastLoginedAt: date,
      };

      if (hashPasswordHelper.comparePw(loginList.mem_password, data.mem_password)) {
        Member.update(updateList, {
          where: {
            mem_id: data.mem_id,
          },
        })
        .then(() => {
          res.json({
            logined: true,
            token_type: 'bearer',
            access_token: authHelper.tokenGenerator(tokenList),
          });
        })
        .catch(onError);
      } else {
        next({ status: 401, code: 'auth/wrong-password' });
      }
    } else {
      next({ status: 401, code: 'auth/wrong-email' });
    }
  };

  Member.findOne({
    where: {
      mem_email: loginList.mem_email,
    },
  })
  .then(respond)
  .catch(onError);
};
