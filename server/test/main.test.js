require('../utils/configEnv');
const supertest = require('supertest');
jest.mock('next', () => require('../../__mocks__/next'));
const server = require('../server');
// require('../server/utils/loadModels');

describe('app', () => {

  let request;
  beforeAll(async () => {
    await server;
    request = supertest('http://localhost:3000/api');
  });

  it('should work', async () => {
    const res = await request.get('/')
      .expect(200);
    expect(res.body).toEqual({ online: true });
  });
});
