import * as http from 'http';
import { usersDB } from '../../../data-base/users';
import { makeResponse } from '../../../utils/makeResponse';

function spawnUser(req: http.IncomingMessage, res: http.ServerResponse) {
  let content = '';

  req.on('data', (chunk) => {
    content += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const newUser = await usersDB.createUser(content);
      makeResponse(res, 201, newUser);
    } catch (error) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = error;
      const message = { message: 'Created user have to contain only follow fields: username, age, hobbies' };
      res.end(JSON.stringify(message));
    }
  });

  req.on('error', () => {
    makeResponse(res, 500);
  });
}

export { spawnUser };
