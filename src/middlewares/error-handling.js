const errorHandling = async (err, request, response, next) => {
  
    // format error
    if (!err.status && !err.errors) {
      response.status(500).json({
        errors: [
          {
            message: err.message,
          },
        ],
      });
    } else {
      response.status(err.status).json({
        message: err.message,
        errors: err.errors,
      });
    }
    next();
  };
  
  module.exports = errorHandling;
  