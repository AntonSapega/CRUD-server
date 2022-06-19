import * as http from 'http';
import { usersDB } from '../../../data-base/users';
import { makeResponse } from '../../../utils/makeResponse';

async function fetchUser(res: http.ServerResponse, id: string): Promise<any> {
  try {
    const user = await usersDB.getUser(id);
    makeResponse(res, 200, user);
  } catch (error) {
    makeResponse(res, error, id);
    // res.setHeader('Content-Type', 'application/json');
    // if (error === 400) {
    //   res.statusCode = 400;
    //   const message = { message: 'Wrong user id' };
    //   res.end(JSON.stringify(message));
    // } else if (error === 404) {
    //   res.statusCode = 404;
    //   const message = { message: `User with id: ${id} does not exits` };
    //   res.end(JSON.stringify(message));
    // }
  }
}

export { fetchUser };
