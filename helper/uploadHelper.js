const multer = require('multer');
const mkdirp = require('mkdirp');
const Q = require('q')

exports.uploadFile = (req, res, opt) => {
  const deferred = Q.defer();
  const option = {
    filesize: opt.fileSize || 2 * 1024 * 1024,
    filename: opt.filename || 'profile',
    path: opt.path || 'uploads/images',
    field: opt.field || null,
  };

  const storages = multer.diskStorage({
    destination(req, file, cb) {
      // Create Folder
      mkdirp(option.path, 0777, (err) => {
        if(err) {
          cb(new Error('Upload/Create Directory Failed'));
        } else {
          // upload images path
          cb(null, option.path);
        }
      });
    },
    filename(req, file, cb) {
      console.log(file);
      cb(null, `${option.filename}.${file.mimetype.split('/')[1]}`);
    },
  });

  const filefilter = (req, file, cb) => {
    const ext = file.mimetype.split('/')[1].toLowerCase();
    if(ext === 'png' || ext === 'jpeg' || ext === 'jpg' || ext === 'gif' || ext === 'pdf') {
      cb(null, true);
    } else {
      cb(new Error('Upload/InVaild File Format'));
    }
  };

  const upload = multer({ 
    limits: { 
      fileSize: option.filesize, 
    },
    storage: storages,
    fileFilter: filefilter,
  });

  upload.single('file');
  upload(req, res, function (err) {
    if (err) {
      deferred.reject();
    } else {
      deferred.resolve(req.file.path);
    }
  });

  return deferred.promise;
};
