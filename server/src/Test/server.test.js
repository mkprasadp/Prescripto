import supertest from 'supertest';
import app from '../../server.js';

test('GET / should return Server is running', async () => {
    const res = await supertest(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Server is running");
});
