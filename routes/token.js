import jwt from 'jwt-simple'

module.exports = (app) => {
  const cfg = app.libs.config
  const Users = app.db.models.Users
  app.post('/token', (req, res) => {
    if (req.body.email && req.body.password) {
      const { email, password } = req.body
      Users.findOne({ where: { email } })
        .then(user => {
          if (Users.isPassword(user.password, password)) {
            const payload = { id: user.id }
            res.json({
              token: jwt.encode(payload, cfg.jwtSecret)
            })
          } else {
            res.sendStatus(401)
          }
        })
        .catch(errorFound => res.sendStatus(401))
    } else {
      res.sendStatus(401)
    }
  })
}
