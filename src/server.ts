import * as http from 'http';
import 'dotenv/config';
import { handleGET } from './controllers/GET/handleGET';
import { handlePOST } from './controllers/POST/handlePOST';
import { handlePUT } from './controllers/PUT/handlePUT';
import { handleDELETE } from './controllers/DELETE/handleDELETE';

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
      handleGET(response, request.url);
      break;
    case RequestMethods.POST:
      handlePOST(request, response, request.url);
      break;
    case RequestMethods.PUT:
      handlePUT(request, response, request.url);
      break;
    case RequestMethods.DELETE:
      handleDELETE(request, response, request.url);
      break;
    default:
      response.setHeader('Content-Type', 'text/html');
      response.statusCode = 405;
      response.write('Method Not Allowed');
      response.end();
  }
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server works on port ${PORT}`);
});
