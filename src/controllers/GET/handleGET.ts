import * as http from 'http';
import { fetchUsersList } from './actions/fetchUsersList';
import { fetchUser } from './actions/fetchUser';

function handleGET(req: http.IncomingMessage, res: http.ServerResponse, url: string): void {
  const urlPieces = url.split('/');
  const urlPath = [urlPieces[0], urlPieces[1], urlPieces[2]].join('/');
  const id = urlPieces[3];

  if (urlPath === '/api/users' && !id) {
    fetchUsersList(req, res);
  } else if (urlPath === '/api/user' && id) {
    fetchUser(req, res, id);
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.end('Page not found');
  }
}

export { handleGET };
