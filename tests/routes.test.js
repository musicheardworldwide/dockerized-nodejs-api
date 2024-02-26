const request = require('supertest');
const app = require('../index'); // Importa o aplicativo do index.js

describe('Testando a rota principal', () => {
  test('Deve retornar o código 200 e a mensagem "Welcome to the API!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to the API!');
  });
});
