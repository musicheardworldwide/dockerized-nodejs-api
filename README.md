# Roadmap para Desenvolvimento de uma API REST com Docker e Node.js

Esse é um projeto simples e open source que visa criar uma API RESTful utilizando o framework do Node.js, em conjunto com Docker 

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução de código JavaScript do lado do servidor.
- **Express.js**: Framework web para Node.js utilizado para criar APIs RESTful de forma rápida e fácil.
- **Docker**: Plataforma de código aberto que facilita a criação, o gerenciamento e a execução de aplicativos em contêineres.
- **Jest**: Framework de testes de JavaScript que é utilizado para escrever e executar testes unitários.
- **Supertest**: Biblioteca utilizada para testar APIs HTTP/s de forma simples e concisa.

## Configuração do Ambiente

### 1.1 Instalação do Docker
- Instale o Docker em sua máquina, caso ainda não tenha feito.
- Verifique se o Docker está funcionando corretamente executando `docker --version` e `docker-compose --version`.

### 1.2 Configuração do Projeto
- Crie uma pasta para o projeto da API.
- Dentro da pasta, crie os arquivos necessários para o projeto.

## Passo 2: Desenvolvimento da API REST com Node.js
### 2.1 index.js
```javascript
const express = require('express');
const routes = require('./routes'); // Importa as rotas do arquivo routes.js

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

// Middleware para parsing do corpo das requisições como JSON
app.use(express.json());

// Usa as rotas definidas no arquivo routes.js
app.use('/', routes);

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
```

### 2.2 routes.js
```javascript
const express = require('express');
const routes = require('./routes');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json());

app.use('/', routes);

// Exporta o aplicativo para que possa ser acessado em outros arquivos (como os testes)
module.exports = app;

// Se estivermos executando o arquivo diretamente (não sendo importado em outro lugar), inicie o servidor
if (require.main === module) {
  app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
  });
}
```

### 2.3 package.json
```json
{
  "name": "node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "nodemon": "^3.1.0"
  }
}
```

### 2.4 Dockerfile
```Dockerfile
// Define a imagem base como node:alpine
FROM node:alpine

// Define o diretório de trabalho dentro do contêiner como /usr/app
WORKDIR /usr/app

// Copia os arquivos package.json e package-lock.json (se existir) do diretório local
// para o diretório de trabalho do contêiner e instala as dependências do Node.js
COPY package*.json ./
RUN npm install

// Copia todos os arquivos do diretório local para o diretório de trabalho do contêiner
COPY . .

// Expõe a porta 3000 do contêiner, permitindo que o tráfego externo se comunique com a aplicação Node.js em execução
EXPOSE 3000

// Define o comando padrão a ser executado quando o contêiner for iniciado
// Neste caso, é o comando `npm start` para iniciar o servidor Node.js
CMD ["npm", "start"]
```

### 2.5 docker-compose.yml
```yaml
version: '3'

services:
  app:
    // Define um serviço chamado "app" que será construído com base no Dockerfile no diretório atual
    build: .

    // Especifica o comando a ser executado quando o contêiner for iniciado
    command: npm start

    // Mapeia a porta 3000 do host para a porta 3000 do contêiner
    // Permitindo acesso à aplicação através do host
    ports:
      - "3000:3000"

    // Monta o diretório local (o diretório do projeto) dentro do contêiner em /usr/app
    // Permitindo que as alterações no código local sejam refletidas no contêiner sem a necessidade de reconstruí-lo
    volumes:
      - .:/usr/app
```

### 2.6 .dockerignore
```Copy code
// Especifica os arquivos e diretórios que devem ser ignorados durante a construção do contêiner Docker
// Neste caso, o diretório node_modules será ignorado para evitar a cópia desnecessária de dependências do Node.js
// Já que elas serão instaladas dentro do contêiner
node_modules
```

## Passo 3: Build e Execução do Contêiner Docker
### 3.1 Construção do Contêiner Docker
- Execute o seguinte comando na raiz do projeto para construir o contêiner Docker:
```Copy code
docker-compose build
```

### 3.2 Execução do Contêiner Docker
- Após a construção bem-sucedida, inicie o contêiner Docker com o seguinte comando:
```Copy code
docker-compose up
```

### 3.3 Teste da API
- Acesse a API em seu navegador ou utilize ferramentas como Postman para testar os endpoints. 
- A URL base da API será `http://localhost:3000`.

## Passo 4: Desenvolvimento Adicional e Manutenção
### 4.1 Desenvolvimento de Novos Recursos 
- Adicione novos endpoints e funcionalidades à sua API no arquivo `index.js`. 
- Execute `docker-compose up --build` sempre que fizer alterações no código para reconstruir o contêiner Docker.

### 4.2 Manutenção 
- Mantenha suas dependências atualizadas no arquivo `package.json`.
- Monitore e gerencie os logs da aplicação para identificar possíveis problemas.
- Realize backups regulares dos dados, se aplicável.