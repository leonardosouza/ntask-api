module.exports = (app) => {
  return {
    findAll: (_params, _callback) => {
      return _callback([
        { title: 'Fazer compras' },
        { title: 'Consertar PC' }
      ])
    }
  }
}
