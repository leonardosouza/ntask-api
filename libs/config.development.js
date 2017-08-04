import logger from './logger.js'

module.exports = {
  database: 'ntask',
  username: 'root',
  password: '',
  params: {
    dialect: 'mysql',
    // storage: 'ntask.sqlite',
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`)
    },
    define: {
      underscored: true
    }
  },
  jwtSecret: 'Nta$K-AP1',
  jwtSession: { session: false }
}
