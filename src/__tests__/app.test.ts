import supertest from 'supertest';

import app from '../app';

describe('Start app and check if it is responding', () => {
  it('should return 200 OK', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
  });
})