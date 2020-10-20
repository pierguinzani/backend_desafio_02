const errorHandling = async (err, req, res, next) => {
  
    // format error
    if (!err.status && !err.errors) {
      res.status(500).json({
        errors: [
          {
            message: err.message,
          },
        ],
      });
    } else {
      res.status(err.status).json({
        message: err.message,
        errors: err.errors,
      });
    }
    next();
  };
  
  module.exports = errorHandling;
  