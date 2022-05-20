const asyncHandler = require('express-async-handler')

// @route   POST api/v1/images
const saveImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    res.status(400)
    throw new Error('Please upload an image')
  }

  return res.status(201).json({
    status: 'success',
    url: process.env.BASE_URL + '/images/' + req.file.filename,
  })
})

module.exports = { saveImage }
