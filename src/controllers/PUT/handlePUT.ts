import * as http from 'http';
import { parseUrl } from '../../utils/parseUrl';
import { updateUser } from './actions/updateUser';
import { routes } from '../../routes/routes';

function handlePUT(req: http.IncomingMessage, res: http.ServerResponse, url: string) {
  const { path, id } = parseUrl(url);

  if (path === routes.users && id) {
    updateUser(req, res, id);
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.end('Not found');
  }
}

export { handlePUT };
