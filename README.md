Roadmap for Development of a REST API with Docker and Node.js
This is a simple, open source project that aims to create a RESTful API using the Node.js framework, in conjunction with Docker

Technologies Used
Node.js : Platform for executing server-side JavaScript code.
Express.js : Web framework for Node.js used to create RESTful APIs quickly and easily.
Docker : Open source platform that makes it easy to build, manage, and run containerized applications.
Jest : JavaScript testing framework that is used to write and run unit tests.
Supertest : Library used to test HTTP/s APIs in a simple and concise way.
Environment Setting
1.1 Docker installation
Install Docker on your machine if you haven't already.
Verify that Docker is working correctly by running docker --versionand docker-compose --version.
1.2 Project Configuration
Create a folder for the API project.
Inside the folder, create the files needed for the project.
Step 2: Development of the REST API with Node.js
2.1 index.js
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
2.2 routes.js
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
2.3 package.json
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
2.4 Dockerfile
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
2.5 docker-compose.yml
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
2.6 .dockerignore
// Especifica os arquivos e diretórios que devem ser ignorados durante a construção do contêiner Docker
// Neste caso, o diretório node_modules será ignorado para evitar a cópia desnecessária de dependências do Node.js
// Já que elas serão instaladas dentro do contêiner
node_modules
Step 3: Build and Run the Docker Container
3.1 Docker Container Construction
Run the following command from the project root to build the Docker container:
docker-compose build
3.2 Running the Docker Container
After successful build, start the Docker container with the following command:
docker-compose up
3.3 Yes API tests
Access the API in your browser or use tools like Postman to test endpoints.
The base URL of the API will be http://localhost:3000.
Step 4: Further Development and Maintenance
4.1 Development of New Resources
Add new endpoints and functionality to your API in the index.js.
Run docker-compose up --buildwhenever you make code changes to rebuild the Docker container.
4.2 Maintenance
Keep your dependencies updated in the package.json.
Monitor and manage application logs to identify potential issues.
Perform regular data backups, if applicable.
