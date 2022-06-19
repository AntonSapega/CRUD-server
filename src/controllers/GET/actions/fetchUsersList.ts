import * as http from 'http';
import { usersDB } from '../../../data-base/users';
import { makeResponse } from '../../../utils/makeResponse';

async function fetchUsersList(res: http.ServerResponse): Promise<any> {
  try {
    const users = await usersDB.getUsers();
    makeResponse(res, 200, users);
  } catch (error) {
    if (error === 500) {
      makeResponse(res, 500);
    }
  }
}

export { fetchUsersList };
