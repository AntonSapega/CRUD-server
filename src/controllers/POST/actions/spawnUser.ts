import * as http from 'http';
import { usersDB } from '../../../data-base/users';

function spawnUser(req: http.IncomingMessage, res: http.ServerResponse) {
  let content = '';

  //! Move it to somewhere BUT I AM NOT SURE
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
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = error;
      const message = { message: 'Created user have to contain only follow fields: username, age, hobbies' };
      res.end(JSON.stringify(message));
    }
  });

  req.on('error', () => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    const message = { message: 'Internal server error' };
    res.write(JSON.stringify(message));
    res.end();
  });
}

export { spawnUser };
