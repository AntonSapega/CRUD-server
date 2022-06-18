import * as http from 'http';
import { spawnUser } from './actions/spawnUser';

function handlePOST(req: http.IncomingMessage, res: http.ServerResponse, url: string): void {
  if (url === '/api/users') {
    spawnUser(req, res);
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.end('Not found');
  }
}

export { handlePOST };
