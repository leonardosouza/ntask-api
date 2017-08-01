module.exports = (app) => {
  const env = process.env.NODE_ENV
  const file = (env) ? `./config.${env}.js` : './config.development.js'
  return require(file)
}
