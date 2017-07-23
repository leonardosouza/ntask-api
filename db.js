import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

let db = null

module.exports = (app) => {
  if (!db) {
    const { database, username, password, params } = app.libs.config
    const sequelize = new Sequelize(database, username, password, params)
    const dir = path.join(__dirname, 'models')

    db = {
      sequelize,
      Sequelize,
      models: {}
    }
    
    fs.readdirSync(dir).forEach(file => {
      const modelDir = path.join(dir, file)
      const model = sequelize.import(modelDir)
      db.models[model.name] = model
    })
    
    Object.keys(db.models).forEach(key => {
      db.models[key].associate(db.models)
    })
  }
  return db
}
