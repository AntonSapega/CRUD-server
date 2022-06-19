import { server } from './app';
import * as request from 'supertest';
import { User } from './interfaces/User';
import { routes } from './routes/routes';

describe('1 SCENARIO: CRUD', () => {
  let user: User;

  it('Should response with empty array: []', async () => {
    const res = await request(server).get(routes.users);
    expect(res.body).toEqual([]);
    expect(res.statusCode).toEqual(200);
  });

  it('POST: should response with recorded info about new user', async () => {
    const bodyReq = {
      username: 'Tommy',
      age: 29,
      hobbies: ['guitar'],
    };

    const res = await request(server).post(routes.users).send(bodyReq);
    user = res.body;

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(bodyReq);
    expect(res.body).toHaveProperty('id');
  });

  it('GET: /api/users/${id} should get user who has been created', async () => {
    const res = await request(server).get(`${routes.users}/${user.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(user);
  });

  it('PUT: api/users/{userId}: should update user', async () => {
    const newName = { username: 'Updated' };
    const res = await request(server).put(`${routes.users}/${user.id}`).send(newName);
    expect(res.body.id).toEqual(user.id);
    expect(res.body.username).toEqual(newName.username);
  });

  it('DELETE: api/users/{userId}: should delete user who has been stored earlier', async () => {
    const res = await request(server).delete(`${routes.users}/${user.id}`);
    expect(res.statusCode).toBe(204);
  });

  it('GET: api/users/{userId}: should try to get a deleted object by id', async () => {
    const res = await request(server).get(`${routes.users}/${user.id}`);
    expect(res.statusCode).toBe(404);
    const message = { message: `User with id: ${user.id} doesn't exist` };
    expect(res.body).toEqual(message);
  });
});

describe('2 SCENARIO: Wrong Method', () => {
  it('PATCH: should try to set PATCH method', async () => {
    const res = await request(server).patch(routes.users);
    const message = { message: 'Method does not allow' };
    expect(res.statusCode).toEqual(405);
    expect(res.body).toEqual(message);
  });

  it('HEAD: should try to set HEAD method', async () => {
    const res = await request(server).copy(routes.users);
    const message = { message: 'Method does not allow' };
    expect(res.statusCode).toEqual(405);
    expect(res.body).toEqual(message);
  });
});

describe('3 SCENARIO: Handle errors', () => {
  it('GET user: should try to get user by wrong id', async () => {
    const wrongID = 'wrong-id-123';
    const res = await request(server).get(`${routes.users}/${wrongID}`);
    const message = { message: 'Wrong user id (it has to be uuid)' };
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(message);
  });

  it('GET user: should try to get user by non existing id', async () => {
    const notExistingID = '6cc7d9eb-5b99-4e0b-8607-7e587e5da432';
    const res = await request(server).get(`${routes.users}/${notExistingID}`);
    expect(res.statusCode).toEqual(404);
    const message = { message: `User with id: ${notExistingID} doesn't exist` };
    expect(res.body).toEqual(message);
  });

  it('POST user: should try to make post method by wrong path', async () => {
    const wrongPath = '/abcd';
    const bodyReq = {
      username: 'Tommy',
      age: 29,
      hobbies: ['guitar'],
    };

    const res = await request(server).post(`${routes.users}/${wrongPath}`).send(bodyReq);
    const message = { message: 'Page not found' };
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(message);
  });

  it('POST user: should try to create user without necessary fields', async () => {
    const badBodyReq = {
      username: 'Tommy',
      hobbies: ['guitar'],
    };

    const res = await request(server).post(routes.users).send(badBodyReq);
    const message = { message: 'Created user have to contain only follow fields: username, age, hobbies' };
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(message);
  });

  it('PUT user: should try to make put method to user by non existing id', async () => {
    const notExistingID = '6cc7d9eb-5b99-4e0b-8607-7e587e5da432';
    const body = {
      username: 'Tommy Updated',
    };
    const res = await request(server).put(`${routes.users}/${notExistingID}`).send(body);
    expect(res.statusCode).toEqual(404);
    const message = { message: `User with id: ${notExistingID} doesn't exist` };
    expect(res.body).toEqual(message);
  });
});
