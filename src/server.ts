import * as http from 'http';
import { handleGET } from './controllers/GET/handleGET';
import { handlePOST } from './controllers/POST/handlePOST';

enum ROUTES {
  users = '/api/users',
  user = '/api/user',
}

enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
  response.setHeader('Allow', 'GET, POST, PUT, DELETE');

  switch (request.method) {
    case RequestMethods.GET:
      handleGET(request, response, request.url);
      break;
    case RequestMethods.POST:
      handlePOST(request, response, request.url);
      break;
    default:
      response.statusCode = 405;
      response.write('Method Not Allowed');
      response.end();
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
