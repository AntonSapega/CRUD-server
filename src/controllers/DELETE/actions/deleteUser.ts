import * as http from 'http';
import { usersDB } from '../../../data-base/users';
import { makeResponse } from '../../../utils/makeResponse';

async function deleteUser(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  try {
    const statusCode = await usersDB.delete(id);
    makeResponse(res, statusCode);
  } catch (error) {
    makeResponse(res, error, id);
  }
}

export { deleteUser };
