import jwt from 'jwt-simple'

module.exports = (app) => {
  const cfg = app.libs.config
  const Users = app.db.models.User

  /**
   * @api {post} /token
   * @apiGroup Credencial
   * @apiParam {String} email Email de usuario
   * @apiParam {String} password Senha de usuario
   * @apiParamExample
   *    {
   *      "email": "john@connor.net",
   *      "password": "123456"
   *    }
   * @apiSuccess {String} token Token de usuario autenticado
   * @apiSuccessExample {json} Sucesso
   *    HTTP/1.1 200 OK
   *    { "token": "xyz.abc.123.hfg" }
   * @apiErrorExample {json} Erro de autenticacao
   *    HTTP/1.1 401 Unauthorized
   */
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
