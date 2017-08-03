import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import logger from './logger.js'

module.exports = (app) => {
  app.set('port', 3000)
  app.set('json spaces', 2)
  app.use(morgan('common', {
    stream: {
      write: (message) => {
        logger.info(message)
      }
    }
  }))
  app.use(cors({
    origin: ['http://localhost:3001', '*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization']
  }))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(app.auth.initialize())
  app.use((req, res, next) => {
    if (req.body && req.body.id) delete req.body.id
    next()
  })
  app.use(express.static('public'))
}
