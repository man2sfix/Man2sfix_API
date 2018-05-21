// Error Handler
function errorHelper (errors) {
  const err = {};
  const errorObj = errors || {};

  // set statusCode
  err.status = errors.status || 500;

  // set code
  err.code = errors.code || '';

  // set error detail
  switch (err.status) {
    // error Bad Requset
    case 400:
      err.statusMessage = 'Bad Request';
      // ...
      break;

    // error Unauthorized
    case 401:
      err.statusMessage = 'Unauthorized';
      // ...
      break;

    // error NotFound
    case 404:
      err.statusMessage = 'Not Found';
      // ...
      break;

    // default
    default:
      err.code = 'Server Error';
      err.statusMessage = errorObj.errors && errorObj.errors[0].message ? errorObj.errors[0].message : 'Server Error';
      err.errno = errorObj.original && errorObj.original.errno ? errorObj.original.errno : '';
      err.sqlState = errorObj.original && errorObj.original.sqlState ? errorObj.original.sqlState : '';
      // ...
      break;
  }

  // return Error
  return err;
}

module.exports = errorHelper;
