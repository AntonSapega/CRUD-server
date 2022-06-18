import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { User } from '../interfaces/User';
import { UsersStore } from '../interfaces/UsersStore';

class Users implements UsersStore<User> {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public getUsers(): Array<User> {
    return this.users;
  }

  public getUser(id: string): User | null {
    if (uuidValidate(id)) {
      const targetUser: User | undefined = this.users.find((user: User) => user.id === id);
      return targetUser ? targetUser : null;
    }

    throw Error('user id is an invalid');
  }

  public createUser(newUser: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const { username, age, hobbies } = JSON.parse(newUser);

      if (username && age && hobbies) {
        const id = uuidv4();
        const user: User = { id, username, age, hobbies };
        this.users.push(user);
        resolve(user);
      }

      reject(null);
    });
  }
}

let usersDB: Users = new Users();

export { usersDB };
