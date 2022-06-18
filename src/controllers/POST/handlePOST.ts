import * as http from 'http';
import { spawnUser } from './actions/spawnUser';
import { routes } from '../../routes/routes';

function handlePOST(req: http.IncomingMessage, res: http.ServerResponse, url: string): void {
  if (url === routes.users) {
    spawnUser(req, res);
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.end('Page not found');
  }
}

export { handlePOST };
