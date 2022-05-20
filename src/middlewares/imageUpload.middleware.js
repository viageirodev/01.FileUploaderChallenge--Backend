const path = require('path')
const util = require('util')
const multer = require('multer')
const config = require('config')
const fs = require('fs')

const maxSize = config.get('imageUpload.maxSize')
const uploadFolder = config.get('imageUpload.uploadFolder')

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.resolve(__basedir + uploadFolder)

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    cb(null, path.resolve(dir))
  },
  filename: (req, file, cb) => {
    const newName =
      file.fieldname +
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname)
    cb(null, newName)
  },
})

const imageFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png']
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
    return cb(new Error('Only jpg, png files are allowed!'))
  }
}

let uploadImage = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: imageFilter,
}).single('image')

uploadImage = util.promisify(uploadImage)
module.exports = uploadImage
