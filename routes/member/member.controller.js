const Sequelize = require('sequelize');

const fs = require('fs');
const multiparty = require('multiparty');
const mkdirp = require('mkdirp');

const hashPasswordHelper = require('../../helper/hashPasswordHelper.js');
const folderHelper = require('../../helper/folderHelper');
const mailHelper = require('../../helper/mailHelper');

const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');
const config = require('../../config/malier.json');

const Member = require('./member.model');

//
// Get All Member
//

exports.getAllMember = (req, res, next) => {
  const onError = (err) => {
    next(err);
  };

  const respond = (results) => {
    results ? res.status(200).json(results) : next({ status: 400, code: 'member/invalid-request' });
  };

  Member.findAndCountAll({
    attributes: {
      exclude: [
        'mem_password'
      ],
    },
    offset: +req.params.start || +req.query.start,
    limit: +req.params.end || +req.query.end,
    order: [
      ['mem_id', 'DESC']
    ]
  })
  .then(respond)
  .catch(onError);
};

//
// Get Member
//

exports.getMember = (req, res, next) => {
  const onError = (err) => {
    next(err);
  };

  const respond = (result) => {
    result ? res.status(200).json(result) : next({ status: 400, code: 'member/invalid-request' });
  };

  Member.findOne({
    where: {
      mem_id: req.params.id,
    },
    attributes: {
      exclude: [
        'mem_password',
      ],
    },
  })
  .then(respond)
  .catch(onError);
};

//
// Get Member Email
//

exports.getMemberEmail = (req, res, next) => {
  const onError = (err) => {
    next(err);
  };

  const respond = (result) => {
    result ? res.status(200).send(result) : res.status(200).send(false);
  };

  Member.findOne({
    where: {
      mem_email: req.params.email,
    },
  })
  .then(respond)
  .catch(onError);
};

//
// Create Member
//

exports.createMember = (req, res, next) => {
  const createList = {};
  const date = new Date().getTime();
  const form = new multiparty.Form();

  form.on('field', (name, value) => {
    createList[`mem_${name}`] = value;
  });

  form.on('part', (part) => {
    let fileName= '';
    let fileSize = 0;
    let filePath = '';

    if (!part.filename) {
      // filename is not defined when this is a field and not a file
      console.log('got field named ' + part.name);
      // ignore field's content
      part.resume();
    } else {
      fileSize = part.byteCount;
      fileName = part.filename;
    }
   
    if (part.name === 'profile') {
      filePath = `upload/images/member/${date}-${createList.mem_email.replace(/[\.@]/ig,'')}/`;
    } else {
      filePath = `upload/files/member/${date}-${createList.mem_email.replace(/[\.@]/ig,'')}/`;
    }

    mkdirp(filePath, 0777, (err) => {
      if (!err) {
        let writeStream = fs.createWriteStream(filePath + fileName);
        writeStream.filename = fileName;
        part.pipe(writeStream);

        part.on('data',function(chunk){
          console.log(fileName + ' read ' + chunk.length + 'bytes');
        });

        part.on('end',function(){
          console.log(fileName + ' Part read complete');
          createList[`mem_${part.name}`] =  part.name === 'profile' ? filePath.replace('upload/','') + fileName : filePath + fileName;
          writeStream.end();
        });
      }
    });
  });

  form.on('error', (err) => {
    console.log('Error parsing form: ' + err);
    folderHelper.deleteF(`upload/images/member/${date}-${createList.mem_email.replace(/[\.@]/ig,'')}`);
    folderHelper.deleteF(`upload/files/member/${date}-${createList.mem_email.replace(/[\.@]/ig,'')}`);
    next({ status: 500, code: 'member/form-faild' })
  });

  form.on('close', () => {
    const onError = (err) => {
      folderHelper.deleteF(`upload/images/member/${date}-${createList.mem_email.replace(/[\.@]/ig,'')}`);
      folderHelper.deleteF(`upload/files/member/${date}-${createList.mem_email.replace(/[\.@]/ig,'')}`);
      if (err.name === 'SequelizeUniqueConstraintError') {
        next({ status: 400, code: 'auth/email-already-in-use' });
      } else {
        next(err);
      }
    };
  
    const respond = () => {
      res.status(201).send(true);
    };

    // Hashing password
    createList.mem_password = hashPasswordHelper.createPw(createList.mem_password);

    // Date Set
    createList.mem_createdAt = date;
    createList.mem_lastLoginedAt = date;
    createList.mem_lastUpdatedAt = date;
    createList.mem_passwordChangedAt = date;
  
    Member.create(createList)
    .then(respond)
    .catch(onError);
  });

  form.parse(req);
};

//
// Delete Member
//

exports.deleteMember = (req, res, next) => {
  const onError = (err) => {
    next(err);
  };

  const respond = (data) => {
    if (data) {
      Member.destroy({
        where: {
          mem_id: req.params.id,
        },
      })
      .then((result) => {
        if (data.mem_profile) {
          let pathArr = data.mem_profile.split('/');
          pathArr.pop();
          folderHelper.deleteF(`upload/${pathArr.join('/')}`);
        };

        if (data.mem_academic_file || data.mem_career_file || data.mem_completion_file) {
          let pathArr = data.mem_profile.split('/');
          pathArr.pop();
          folderHelper.deleteF(pathArr.join('/'));
        };

        res.status(200).send(true);
      })
      .catch(onError);
    } else {
      next(errorHelper(400));
    }
  };

  Member.findById(req.params.id)
  .then(respond)
  .catch(onError);
};

//
// Update Member
//

exports.updateMember = (req, res, next) => {
  let id = 0;
  let profileRemove = false;
  let profileURL = '';
  const updateList = {};
  const date = new Date().getTime();
  const form = new multiparty.Form();

  form.on('field', (name, value) => {
    if (name === 'id') {
      id = value;
    } else if(name === 'profileRemove') {
      profileRemove = value;
    } else if (name === 'profileURL') {
      profileURL = value;
    } else {
      updateList[`mem_${name}`] = value;
    }
  });

  form.on('part', (part) => {
    let fileName= '';
    let fileSize = 0;
    let filePath = '';

    if (!part.filename) {
      // filename is not defined when this is a field and not a file
      console.log('got field named ' + part.name);
      // ignore field's content
      part.resume();
    } else {
      fileSize = part.byteCount;
      fileName = part.filename;
      filePath = `upload/images/member/${date}-${updateList.mem_email.replace(/[\.@]/ig,'')}/`;
    }

    mkdirp(filePath, 0777, (err) => {
      if (!err) {
        let writeStream = fs.createWriteStream(filePath + fileName);
        writeStream.filename = fileName;
        part.pipe(writeStream);

        part.on('data', (chunk) => {
          console.log(fileName + ' read ' + chunk.length + 'bytes');
        });

        part.on('end', () => {
          console.log(fileName + ' Part read complete');
          updateList[`mem_${part.name}`] = filePath.replace('upload/','') + fileName
          writeStream.end();
        });
      }
    });
  });

  form.on('error', (err) => {
    console.log('Error parsing form: ' + err);
    next({ status: 500, code: 'member/form-faild' })
  });

  form.on('close', () => {
    // path setting
    const path = profileURL.split('/');
    path.pop();
    
    const onError = (err) => {
      if (profileRemove && profileURL) {
        if (profileRemove === 'true' && profileURL) {
          if (!updateList.mem_profile) {
            if (path.length > 1) {
              folderHelper.deleteF(`upload/${path.join('/')}`);
            }
            updateList.mem_profile = null;
          } else {
            if (path.length > 1) {
              folderHelper.deleteF(`upload/${path.join('/')}`);
            }
          }
        }
        next(err)
      } else {
        next(err)
      }
    };
  
    const respond = () => {
      res.status(201).send(true);
    };

    // if remove profile
    if (profileRemove === 'true' && profileURL) {
      if (!updateList.mem_profile) {
        if (path.length > 1) {
          folderHelper.deleteF(`upload/${path.join('/')}`);
        }
        updateList.mem_profile = null;
      } else {
        if (path.length > 1) {
          folderHelper.deleteF(`upload/${path.join('/')}`);
        }
      }
    }

    // Date Set
    updateList.mem_lastUpdatedAt = date;
  
    Member.update(updateList, {
      where: {
        mem_id: id
      },
    })
    .then(respond)
    .catch(onError);
  });

  form.parse(req);
};

//
// Find Member Email
//

exports.findMemberEmail = (req, res, next) => {
  const Op = Sequelize.Op;

  const onError = (err) => {
    next(err);
  };

  const respond = (data) => {
    if (data) {
      res.status(200).send(data.mem_email);
    } else {
      next({ status: 400, code: 'auth/user-not-found' });
    }
  };

  Member.findOne({
    where: {
      [Op.and]: [
        { mem_name: req.body.name },
        { mem_phone: req.body.phone },
      ],
    },
  })
  .then(respond)
  .catch(onError);
}

//
// Find Member Password
//

exports.findMemberPassword = (req, res, next) => {
  const Op = Sequelize.Op;

  const onError = (err) => {
    next({ status: 400, code: 'auth/user-not-found' });
  };

  const respond = (data) => {
    if (data) {
      let verify = mailHelper.verifyGenerator();
      const sender = '맨투스픽 <noreply@man2sfix.com>';
      const receiver = req.body.email;
      const mailTitle = '맨투스픽 임시 비밀번호 발급';
      const html = `
      <div style="background:#f5f5f5">
        <div style="background-color:#f5f5f5;padding:80px 0;">
          <div style="margin:0 auto;max-width:600px;background:#ffffff">
          <table align="center" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;border-top:3px solid #007bff" border="0">
            <tbody>
              <tr>
                <td style="text-align:center;vertical-align:top;font-size:0px;padding:40px 30px 30px 30px">
                  <div style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%">
                    <table cellpadding="0" cellspacing="0" width="100%" border="0">
                      <tbody>
                        <tr>
                          <td align="center" style="word-break:break-word;font-size:0px;padding:0px;padding-bottom:30px"></td>
                        </tr>
                        <tr>
                          <td align="center" style="word-break:break-word;font-size:0px;padding:0px;padding-bottom:30px">
                            <div style="color:#55575d;font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;line-height:22px">
                              맨투스픽 임시 비밀번호
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="word-break:break-word;font-size:0px;padding:0px;padding-bottom:35px">
                            <div style="color:#8c8c8c;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:22px">
                              아래의 임시 비밀번호를 확인하여 주세요.
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="word-break:break-word;font-size:0px;padding:0px">
                            <div style="color:#8c8c8c;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;margin-bottom:20px;border:solid 1px #ccc;border-radious:5px;min-width:30%;padding: 0 20px;">
                              <b> ${verify} </b>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="word-break:break-word;font-size:0px;padding:0px">
                            <div style="color:#8c8c8c;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:22px">
                              맨투스픽
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>`;

      const mailOptions = {
        from: sender,
        to: receiver,
        subject: mailTitle,
        html: html
      };

      const transporter = nodemailer.createTransport(smtpPool({
        service: config.mailer.service,
        host: config.mailer.host,
        port: config.mailer.port,
        auth: {
          user: config.mailer.user,
          pass: config.mailer.password
        },
        tls: {
          rejectUnauthorize: false
        },
        maxConnections: 5,
        maxMessages: 10
      }));

      transporter.sendMail(mailOptions, function (err, sendData) {
        if (err) {
          // close
          transporter.close();
          // next
          next(err)
        } else {
          // close
          transporter.close();
          // Hashing password
          verify = hashPasswordHelper.createPw(verify);
          // update
          Member.update({
            mem_password: verify,
            mem_passwordChangedAt: new Date().getTime()
          }, {
            where: {
              mem_id: data.mem_id,
            },
          })
          .then(() => {
            res.status(200).send(true);
          })
          .catch((err) => {
            next(err);
          })
        }
      });
    } else {
      next({ status: 400, code: 'auth/user-not-found' });
    }
  };

  Member.findOne({
    where: {
      [Op.and]: [
        { mem_email: req.body.email },
        { mem_phone: req.body.phone },
      ],
    },
  })
  .then(respond)
  .catch(onError);
}

//
// Change Password
//

exports.changePassword = (req, res, next) => {
  const onError = (err) => {
    next(err);
  };

  const respond = (data) => {
    if (data) {
      if (hashPasswordHelper.comparePw(req.body.password, data.mem_password)) {
        // Hashing password
        const newPassword = hashPasswordHelper.createPw(req.body.newPassword);
      
        Member.update({
          mem_password: newPassword,
          mem_passwordChangedAt: new Date().getTime()
        }, {
          where: {
            mem_id: data.mem_id,
          },
        })
        .then(() => {
          res.status(200).send(true);
        })
        .catch((err) => {
          next(err);
        })
      } else {
        next({ status: 401, code: 'auth/wrong-password' })
      }
    } else {
      next({ status: 400, code: 'auth/user-not-found' })
    }
  };

  Member.findOne({
    where: {
      mem_id: req.body.id
    },
  })
  .then(respond)
  .catch(onError);
}
