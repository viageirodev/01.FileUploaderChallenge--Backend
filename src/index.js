const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middlewares/error.middleware')
const path = require('path')

// Definir a pasta root do projeto para facilitar o acesso aos arquivos
global.__basedir = path.resolve(__dirname, '..')

const port = process.env.PORT || 5000

const app = express()

// Configurar cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/images', express.static(path.resolve(__basedir, 'tmp')))

app.use('/api/v1/images', require('./routes/image.routes'))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
