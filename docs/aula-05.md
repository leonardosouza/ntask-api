# Instalar o Mocha, Chai, Supertest
```bash 
npm i --save-dev mocha chai supertest babel-register
```

# Instruções Gerais

- Refatorar config para versões de development e test: `libs/config.development.js` e `libs/config.test.js`
- Implementar novo config para estratégia de carregamento de acordo com o ENV
- Adicionar a chave `test` no `npm scripts`
- Adicionar safeguard no `libs/boot.js`
- Adicionar arquivo de opts do mocha em `test/mocha.opts`
- Rodar os testes com `npm test`

# Instruções para uso do SQLite3

```bash
$ sqlite3

sqlite> .open ntask.sqlite
sqlite> .databases
sqlite> .tables
sqlite> .header on
sqlite> .mode column
sqlite> select * from Tasks;
sqlite> select * from Users;
sqlite> .quit
```

[voltar](https://github.com/leonardosouza/ntask-api)
