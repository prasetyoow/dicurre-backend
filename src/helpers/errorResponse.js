const response = require('./standardResponse');

const errorHandling = (msg, param, location = 'body') => [ 
  {
    msg,
    param,
    location
  }
];

const errorReponse = (err, res) => {
  // users
  if (err.code === '23505' && err.detail.includes('email')) {
    const errRes = errorHandling('Email already exists', 'email');
    return response(res, 'Error', errRes, 400);
  }
  if (err.code === '23505' && err.detail.includes('username')) {
    const errRes = errorHandling('Username already exists', 'username');
    return response(res, 'Error', errRes, 400);
  }
  // end

  // profile
  if (err.code === '23505' && err.detail.includes('user_id')) {
    const errRes = errorHandling('User ID already exists', 'User id');
    return response(res, 'Error', errRes, 400);
  }

  if (err.code === '23505' && err.detail.includes('number')) {
    const errRes = errorHandling('Phone number already exists', 'User id');
    return response(res, 'Error', errRes, 400);
  }
  // end

  // transaction-type
  if (err.code === '23505' && err.detail.includes('name')) {
    const errRes = errorHandling('Name already exists', 'email');
    return response(res, 'Error', errRes, 400);
  }
  // end
  return response(res, 'Error', null, 400);
};

module.exports = errorReponse;
