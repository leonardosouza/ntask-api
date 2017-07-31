# Instalar o Passport
```bash 
npm i --save passport passport-jwt jwt-simple bcrypt
```

# Instruções Gerais

- Adicionar keys do JWT no `libs/config.js`
- Implementar autenticação JWT no `auth.js`
- Adicionar a camada de autenticação no `index.js`
- Configurar o modelo de usuários para gerar tokens em `models/users.js`
- Refatorar rotas para adicionar método de autenticação para todos os requests
- Testes as rotas da API utilizando POSTMAN

# Testes via POSTMAN
- Criar novo usuário
- Obter token através do endpoint `/token`
- Adicionar o header `Authenticate` com o valor `JWT {token}` em todas as chamadas da API

[voltar](https://github.com/leonardosouza/ntask-api)
