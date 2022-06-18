import * as http from 'http';
import { parseUrl } from '../../utils/parseUrl';
import { routes } from '../../routes/routes';
import { deleteUser } from './actions/deleteUser';

function handleDELETE(req: http.IncomingMessage, res: http.ServerResponse, url: string) {
  const { path, id } = parseUrl(url);

  if (path === routes.users) {
    deleteUser(req, res, id);
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.end('Page not found');
  }
}

export { handleDELETE };
