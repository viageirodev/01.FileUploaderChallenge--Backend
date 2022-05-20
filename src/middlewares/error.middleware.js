const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500

  // If is in development mode, log the error
  if (process.env.NODE_ENV !== 'production') {
    console.log(err)
  }

  // If is a multer upload middleware error, set the status code to 400
  if (err.name === 'MulterError') {
    statusCode = 400
  }

  res.status(statusCode).json({
    status: 'error',
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = { errorHandler }
