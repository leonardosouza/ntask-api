# Inicialize o projeto
```bash 
git init
```

# Adicione o package.json
```bash 
npm init -y
```

# Instale o express
```bash 
npm i --save express
```

# Instale o babel + preset env
```bash 
npm i --save-dev babel-cli babel-preset-env
```

# Configure o .babelrc
```json
{
  "presets": ["env"]
}
```

# Instale o ESLint
```bash 
npm i --save-dev eslint
```

# Configure o ESLint (JS Standard / Airbnb / Google)
```bash 
./node_modules/.bin/eslint --init
```

# Adicione o .editorconfig
```yml
[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = space
indent_size = 2
```

# Instruções Gerais
- Adicionar 2 endpoints estáticos
- Instalar consign e migrar endpoints (models, routes, middlewares e boot)

[voltar](https://github.com/leonardosouza/ntask-api)
