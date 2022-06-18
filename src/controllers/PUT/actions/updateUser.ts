import * as http from 'http';
import { usersDB } from '../../../data-base/users';

function updateUser(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const user = await usersDB.update(id, body);
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
  });
}

export { updateUser };
