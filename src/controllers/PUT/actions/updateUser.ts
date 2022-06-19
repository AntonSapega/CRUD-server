import * as http from 'http';
import { usersDB } from '../../../data-base/users';
import { makeResponse } from '../../../utils/makeResponse';

function updateUser(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const user = await usersDB.update(id, body);
      makeResponse(res, 200, user);
    } catch (error) {
      makeResponse(res, error, id);
    }
  });

  req.on('error', () => {
    makeResponse(res, 500);
  });
}

export { updateUser };
