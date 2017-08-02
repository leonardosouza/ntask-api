import express from 'express'
import bodyParser from 'body-parser'

module.exports = (app) => {
  app.set('port', 3000)
  app.set('json spaces', 2)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(app.auth.initialize())
  app.use((req, res, next) => {
    if (req.body && req.body.id) delete req.body.id
    next()
  })
  app.use(express.static('public'))
}
