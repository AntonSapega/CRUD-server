import * as http from 'http';
import { spawnUser } from './actions/spawnUser';
import { routes } from '../../routes/routes';
import { makeResponse } from '../../utils/makeResponse';

function handlePOST(req: http.IncomingMessage, res: http.ServerResponse, url: string): void {
  if (url === routes.users) {
    spawnUser(req, res);
  } else {
    makeResponse(res, 404);
  }
}

export { handlePOST };
