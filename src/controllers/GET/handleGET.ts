import * as http from 'http';
import { fetchUsersList } from './actions/fetchUsersList';
import { fetchUser } from './actions/fetchUser';
import { parseUrl } from '../../utils/parseUrl';
import { routes } from '../../routes/routes';
import { makeResponse } from '../../utils/makeResponse';

function handleGET(res: http.ServerResponse, url: string): void {
  const { path, id } = parseUrl(url);

  if (path === routes.users && !id) {
    fetchUsersList(res);
  } else if (path === '/api/users' && id) {
    fetchUser(res, id);
  } else {
    makeResponse(res, 404);
  }
}

export { handleGET };
