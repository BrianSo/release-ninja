require('../server/utils/configEnv');
const supertest = require('supertest');
const server = require('../server/server');
// require('../server/utils/loadModels');

describe('app', () => {

  let request;
  beforeAll(async () => {
    await server;
    request = supertest('http://localhost:3000');
  });

  it('should work', async () => {
    const res = await request.get('/')
      .expect(200);
    expect(res.body).toEqual({ online: true });
  });
});
