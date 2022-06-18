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
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = error;
      res.write('Internal server error');
      res.end();
    }
  }
}

export { fetchUsersList };
