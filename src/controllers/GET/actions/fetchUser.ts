import * as http from 'http';
import { usersDB } from '../../../data-base/users';

async function fetchUser(res: http.ServerResponse, id: string): Promise<any> {
  try {
    const user = await usersDB.getUser(id);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(user));
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    if (error === 400) {
      res.statusCode = 400;
      const message = { message: 'Wrong user id' };
      res.end(JSON.stringify(message));
    } else if (error === 404) {
      res.statusCode = 404;
      const message = { message: `User with id: ${id} does not exits` };
      res.end(JSON.stringify(message));
    }
  }
}

export { fetchUser };
