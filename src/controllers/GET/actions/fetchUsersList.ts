import * as http from 'http';
import { usersDB } from '../../../data-base/users';

async function fetchUsersList(res: http.ServerResponse): Promise<any> {
  try {
    const users = await usersDB.getUsers();
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(users));
  } catch (error) {
    if (error === 500) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = error;
      const message = { message: 'Internal server error' };
      res.write(JSON.stringify(message));
      res.end();
    }
  }
}

export { fetchUsersList };
