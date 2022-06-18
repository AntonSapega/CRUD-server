import * as http from 'http';
import { usersDB } from '../../../data-base/users';

function spawnUser(req: http.IncomingMessage, res: http.ServerResponse) {
  let content = '';

  //! Move it to somewhere BUT I AM NOT SURE
  //! Did not catch error event
  req.on('data', (chunk) => {
    content += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const newUser = await usersDB.createUser(content);
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 201;
      res.end(JSON.stringify(newUser));
    } catch (error) {
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 400;
      res.end('Created user have to contain only follow fields: username, age, hobbies');
    }
  });
}

export { spawnUser };
