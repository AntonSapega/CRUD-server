import * as http from 'http';
import { spawnUser } from './actions/spawnUser';
import { routes } from '../../routes/routes';

function handlePOST(req: http.IncomingMessage, res: http.ServerResponse, url: string): void {
  if (url === routes.users) {
    spawnUser(req, res);
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    const message = { message: 'Page not found' };
    res.end(JSON.stringify(message));
  }
}

export { handlePOST };
