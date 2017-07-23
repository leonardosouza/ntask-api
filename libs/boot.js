module.exports = (app) => {
  const PORT = app.get('port')
  app.listen(PORT, console.log(`NTask API - Running on port ${PORT}...`))
}
