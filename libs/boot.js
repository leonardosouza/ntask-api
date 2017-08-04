import https from 'https'
import fs from 'fs'

module.exports = (app) => {
  if (process.env.NODE_ENV !== 'test') {
    const credentials = {
      key: fs.readFileSync('www.ntask.com.br.key', 'utf8'),
      cert: fs.readFileSync('www.ntask.com.br.cert', 'utf8')
    }

    const PORT = app.get('port')

    app.db.sequelize.sync().done(() => {
      https
        .createServer(credentials, app)
        .listen(PORT, console.log(`NTask API - Running on port ${PORT}...`))
    })
  }
}
