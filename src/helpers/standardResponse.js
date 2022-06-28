const response = (res, msg, results, status = 200) => {
  let success = true;
  
  if ( status >= 400 ) {
    success = false;
  }
  
  const data = {
    success,
    message: msg
  };
    
  if (results) {
    data.results = results;
  }

  return res.status(status).json(data);

};

module.exports = response;