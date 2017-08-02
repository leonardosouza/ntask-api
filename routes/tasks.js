module.exports = (app) => {
  const Tasks = app.db.models.Tasks

  app.route('/tasks')
    .all(app.auth.authenticate())
    /**
     * @api {get} /tasks Lista tarefas
     * @apiGroup Tarefas
     * @apiHeader {String} Authorization Token de usuario
     * @apiHeaderExample {json} Header
     *    { "Authorization" : "JWT xyz.abc.123.hfg" }
     * @apiSuccess {Object[]} tasks Lista de tarefas
     * @apiSuccess {Number} tasks.id Id de registro
     * @apiSuccess {String} tasks.title Título da Tarefa
     * @apiSuccess {Boolean} tasks.done Tarefa foi concluida?
     * @apiSuccess {Date} tasks.updated_at Data de atualizacao
     * @apiSuccess {Date} tasks.created_at Data de cadastro
     * @apiSuccess {Date} tasks.user_id Id de usuario
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    [{
     *      "id": 1,
     *      "title": "Estudar",
     *      "done": false,
     *      "updated_at": "2015-09-24T15:46:51.778Z",
     *      "created_at": "2015-09-23T15:46:51.778Z",
     *      "user_id": 1
     *    }]
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Tasks.findAll({ where: { user_id: req.user.id } })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message })
        })
    })

    /**
     * @api {post} /tasks Cadastra uma tarefa
     * @apiGroup Tarefas
     * @apiHeader {String} Authorization Token de usuario
     * @apiHeaderExample {json} Header
     *    { "Authorization" : "JWT xyz.abc.123.hfg" }
     * @apiParam {String} title Titulo da Tarefa
     * @apiParamExample {json} Entrada
     *    { "title": "Estudar" }
     * @apiSuccess {Number} id Id de registro
     * @apiSuccess {String} title Titulo da Tarefa
     * @apiSuccess {Boolean} done Tarefa foi concluida?
     * @apiSuccess {Date} updated_at Data de atualizacao
     * @apiSuccess {Date} created_at Data de cadastro
     * @apiSuccess {Date} user_id Id de usuario
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "title": "Estudar",
     *      "done": false,
     *      "updated_at": "2015-09-24T15:46:51.778Z",
     *      "created_at": "2015-09-23T15:46:51.778Z",
     *      "user_id": 1
     *    }
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
    .post((req, res) => {
      req.body.user_id = req.user.id
      Tasks.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message })
        })
    })

  app.route('/tasks/:id')
    .all(app.auth.authenticate())
    /**
     * @api {get} /tasks/:id Exibe uma tarefa
     * @apiGroup Tarefas
     * @apiHeader {String} Authorization Token de usuario
     * @apiHeaderExample {json} Header
     *    { "Authorization" : "JWT xyz.abc.123.hfg" }
     * @apiParam {Number} id Id da tarefa
     * @apiSuccess {Object[]} tasks Lista de tarefas
     * @apiSuccess {Number} id Id de registro
     * @apiSuccess {String} title Título da Tarefa
     * @apiSuccess {Boolean} done Tarefa foi concluida?
     * @apiSuccess {Date} updated_at Data de atualizacao
     * @apiSuccess {Date} created_at Data de cadastro
     * @apiSuccess {Date} user_id Id de usuario
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "title": "Estudar",
     *      "done": false,
     *      "updated_at": "2015-09-24T15:46:51.778Z",
     *      "created_at": "2015-09-23T15:46:51.778Z",
     *      "user_id": 1
     *    }
     * @apiErrorExample {json} Tarefa nao exite
     *    HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Tasks.findOne({ where: req.params, user_id: req.user.id })
        .then(result => {
          if (result) return res.json(result)
          return res.sendStatus(404)
        })
        .catch(error => {
          res.status(412).json({ msg: error.message })
        })
    })

    /**
     * @api {put} /tasks/:id Atualiza uma tarefa
     * @apiGroup Tarefas
     * @apiHeader {String} Authorization Token de usuario
     * @apiHeaderExample {json} Header
     *    { "Authorization" : "JWT xyz.abc.123.hfg" }
     * @apiParam {Number} id Id da Tarefa
     * @apiParam {String} title Titulo da Tarefa
     * @apiParam {Boolean} done Tarefa foi concluida?
     * @apiParamExample {json} Entrada
     *    { "title": "Estudar", "done": true }
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
    .put((req, res) => {
      Tasks.update(req.body, { where: req.params, user_id: req.user.id })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({ msg: error.message })
        })
    })

    /**
     * @api {delete} /tasks/:id Exclui uma tarefa
     * @apiGroup Tarefas
     * @apiHeader {String} Authorization Token de usuario
     * @apiHeaderExample {json} Header
     *    { "Authorization" : "JWT xyz.abc.123.hfg" }
     * @apiParam {Number} id Id da Tarefa
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
    .delete((req, res) => {
      Tasks.destroy({ where: req.params, user_id: req.user.id })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({ msg: error.message })
        })
    })
}
