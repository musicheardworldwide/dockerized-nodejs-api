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
