import * as http from 'http';
import { usersDB } from '../../../data-base/users';

async function deleteUser(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  try {
    const statusCode = await usersDB.delete(id);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = statusCode;
    res.end();
  } catch (error) {
    switch (error) {
      case 400:
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;
        res.end('Wrong user id');
        break;
      case 404:
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.end(`User with id: ${id} doesn't exist`);
    }
  }
}

export { deleteUser };
