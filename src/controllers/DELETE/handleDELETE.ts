import * as http from 'http';
import { parseUrl } from '../../utils/parseUrl';
import { routes } from '../../routes/routes';
import { deleteUser } from './actions/deleteUser';
import { makeResponse } from '../../utils/makeResponse';

function handleDELETE(req: http.IncomingMessage, res: http.ServerResponse, url: string) {
  const { path, id } = parseUrl(url);

  if (path === routes.users) {
    deleteUser(req, res, id);
  } else {
    makeResponse(res, 404);
  }
}

export { handleDELETE };
