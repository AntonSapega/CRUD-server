import * as http from 'http';

function makeResponse(res: http.ServerResponse, statusCode: number, payload?: any) {
  res.setHeader('Content-Type', 'application/json');

  if (statusCode === 200) {
    res.statusCode = 200;
    res.end(JSON.stringify(payload));
    return;
  }

  if (statusCode === 201) {
    res.statusCode = 201;
    res.end(JSON.stringify(payload));
    return;
  }

  if (statusCode === 204) {
    res.statusCode = 204;
    res.end();
  }

  if (statusCode === 400) {
    res.statusCode = 400;
    const message = { message: 'Wrong user id (it has to be uuid)' };
    res.end(JSON.stringify(message));
    return;
  }

  if (statusCode === 404) {
    res.statusCode = 404;
    if (payload) {
      const messageID = { message: `User with id: ${payload} doesn't exist` };
      res.end(JSON.stringify(messageID));
      return;
    }
    const message = { message: 'Page not found' };
    res.end(JSON.stringify(message));
    return;
  }

  if (statusCode === 405) {
    res.statusCode = 405;
    const message = { message: 'Method does not allow' };
    res.write(JSON.stringify(message));
    res.end();
    return;
  }

  if (statusCode === 500) {
    res.statusCode = 500;
    const message = { message: 'Internal server error' };
    res.write(JSON.stringify(message));
    res.end();
    return;
  }
}

export { makeResponse };
