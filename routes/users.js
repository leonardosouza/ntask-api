module.exports = (app) => {
  const Users = app.db.models.Users

  app.route('/user')
    .all(app.auth.authenticate())

    /**
     * @api {get} /user Exibe usuario autenticado
     * @apiGroup Usuario
     * @apiHeader {String} Authorization Token de usuario
     * @apiHeaderExample {json} Header
     *    { "Authorization" : "JWT xyz.abc.123.hfg" }
     * @apiSuccess {Number} id Id de registro
     * @apiSuccess {String} name Nome
     * @apiSuccess {String} email Email
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "name": "John Connor",
     *      "email": "john@connor.net"
     *    }
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Users.findById(req.user.id, { attributes: ['id', 'name', 'email'] })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message })
        })
    })

    /**
     * @api {delete} /user Exclui usuario autenticado
     * @apiGroup Usuario
     * @apiHeader {String} Authorization Token de usuario
     * @apiHeaderExample {json} Header
     *    { "Authorization" : "JWT xyz.abc.123.hfg" }
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Erro de exclusão
     *    HTTP/1.1 412 Precondition Failed
     */
    .delete((req, res) => {
      Users.destroy({ where: { id: req.user.id } })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({ msg: error.message })
        })
    })

  app.route('/users')
    /**
     * @api {post} /users Cadastra novo usuario
     * @apiGroup Usuario
     * @apiHeader {String} Authorization Token de usuario
     * @apiParam {String} name Nome
     * @apiParam {String} email Email
     * @apiParam {String} password Senha
     * @apiParamExample {json} Entrada
     *    HTTP/1.1 200 OK
     *    {
     *      "name": "John Connor",
     *      "email": "john@connor.net",
     *      "password": "123456"
     *    }
     * @apiSuccess {Number} id Id de registro
     * @apiSuccess {String} name Nome
     * @apiSuccess {String} email Email
     * @apiSuccess {String} password Senha criptografada
     * @apiSuccess {Date} updated_at Data de atualizacao
     * @apiSuccess {Date} created_at Data de cadastro
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "name": "John Connor",
     *      "email": "john@connor.net",
     *      "password": "$2a$10$SK1B1",
     *      "updated_at": "2015-09-24T15:46:51.778Z",
     *      "created_at": "2015-09-23T15:46:51.778Z",
     *    }
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
    .post((req, res) => {
      Users.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message })
        })
    })
}
