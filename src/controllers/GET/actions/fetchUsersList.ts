import * as http from 'http';
import { getUsersList } from '../../../models/usersModel';

async function fetchUsersList(req: http.IncomingMessage, res: http.ServerResponse): Promise<any> {
  try {
    const users = await getUsersList();
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log('ERROR: ', error);
  }
}

export { fetchUsersList };
