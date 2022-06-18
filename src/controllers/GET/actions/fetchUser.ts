import * as http from 'http';
import { getUser } from '../../../models/usersModel';

async function fetchUser(req: http.IncomingMessage, res: http.ServerResponse, id: string): Promise<any> {
  try {
    const user = await getUser(id);
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(user));
    } else if (!user) {
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 404;
      res.end('User does not exist');
    }
  } catch (error) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 400;
    res.end(error.message);
  }
}

export { fetchUser };
