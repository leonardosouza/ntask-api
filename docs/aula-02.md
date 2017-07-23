# Instalar o Sequelize e SQLite
```bash 
npm i --save sequelize sqlite
```

# Instruções Gerais

- Adicionar arquivo de configuração do banco: `libs/config.js`
- Adicionar arquivo Singleton para inicialização do banco: `db.js`
- Modificar `index.js` para incluir a referência ao `db.js`
- Criar os modelos: `models/task.js` e `models/users.js`
- Refactoring no `db.js` para carregar arquivos dinamicamente
- Alterar a rota `routes/task.js` para que o método `findAll` utilize promises

[voltar](https://github.com/leonardosouza/ntask-api)
