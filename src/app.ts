import * as http from 'http';
import 'dotenv/config';
import { RequestMethods } from './enums/requestMethods';
import { handleGET } from './controllers/GET/handleGET';
import { handlePOST } from './controllers/POST/handlePOST';
import { handlePUT } from './controllers/PUT/handlePUT';
import { handleDELETE } from './controllers/DELETE/handleDELETE';
import { makeResponse } from './utils/makeResponse';

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
      makeResponse(response, 405);
  }
});

export { server };
