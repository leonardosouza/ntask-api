describe('Routes: Token', () => {
  const Users = app.db.models.Users
  describe('POST /token', () => {
    beforeEach(done => {
      Users
        .destroy({ where: { name: 'John' } })
        .then(() => Users.create({
          name: 'John',
          email: 'john@email.net',
          password: '12345'
        }))
        .then(() => Users.findOrCreate({ where: { name: 'John' } }))
        .spread((user, created) => {
          done()
        })
    })

    describe('status 200', () => {
      it('returns authenticated user token', done => {
        request.post('/token')
          .send({
            email: 'john@email.net',
            password: '12345'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.include.keys('token')
            done(err)
          })
      })
    })

    describe('status 401', () => {
      it('throws errors when password is incorrect', done => {
        request.post('/token')
          .send({
            email: 'john@email.net',
            password: 'SENHA_INCORRETA'
          })
          .expect(401)
          .end((err, res) => {
            done(err)
          })
      })

      it('throws errors when email not exist', done => {
        request.post('/token')
          .send({
            email: 'EMAIL_INCORRETO',
            password: 'SENHA_INCORRETA'
          })
          .expect(401)
          .end((err, res) => {
            done(err)
          })
      })

      it('throws errors when email and password are blank', done => {
        request.post('/token')
          .expect(401)
          .end((err, res) => {
            done(err)
          })
      })
    })
  })
})
