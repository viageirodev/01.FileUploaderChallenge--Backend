const express = require('express')
const router = express.Router()
const uploadImage = require('../middlewares/imageUpload.middleware')
const { saveImage } = require('../controllers/image.controller')

//@ Base url = /api/v1/images
router.post('/', uploadImage, saveImage)
module.exports = router
