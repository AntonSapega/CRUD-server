import * as http from 'http';
import { parseUrl } from '../../utils/parseUrl';
import { updateUser } from './actions/updateUser';
import { routes } from '../../routes/routes';
import { makeResponse } from '../../utils/makeResponse';

function handlePUT(req: http.IncomingMessage, res: http.ServerResponse, url: string) {
  const { path, id } = parseUrl(url);

  if (path === routes.users && id) {
    updateUser(req, res, id);
  } else {
    makeResponse(res, 404);
  }
}

export { handlePUT };
