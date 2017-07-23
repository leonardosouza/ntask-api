module.exports = (app) => {
  app.db.sequelize.sync().done(() => {
    const PORT = app.get('port')
    app.listen(PORT, console.log(`NTask API - Running on port ${PORT}...`))
  })
}
