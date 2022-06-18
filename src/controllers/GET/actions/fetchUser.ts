import * as http from 'http';
import { usersDB } from '../../../data-base/users';

async function fetchUser(res: http.ServerResponse, id: string): Promise<any> {
  try {
    const user = await usersDB.getUser(id);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(user));
  } catch (error) {
    res.setHeader('Content-Type', 'text/html');
    if (error === 400) {
      res.statusCode = 400;
      res.end('Wrong user id');
    } else if (error === 404) {
      res.statusCode = 404;
      res.end('User does not exits');
    }
  }
}

export { fetchUser };
