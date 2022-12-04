const supertest = require('supertest');
const app = require('./app');
const request = supertest(app);

it('test verification message', done => {
    request.get("/").expect('Hello World!').end(done);
});

it('test pass test', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
});
