import * as http from 'http';
import * as users from './users.json';

enum ROUTES {
  users = '/api/users',
}

enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
  // console.log('RESPONSE WAS SENDED', request.method);
  response.setHeader('Content-Type', 'application/json');

  if (request.url === ROUTES.users && request.method === RequestMethods.GET) {
    response.statusCode = 200;
    response.end(JSON.stringify(users));
  } else {
    response.statusCode = 404;
    response.end(JSON.stringify({ message: 'Page was not found' }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
