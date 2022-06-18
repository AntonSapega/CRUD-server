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

      reject(null); //! return message
    });
  }

  public update(id: string, body: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const { username, age, hobbies } = JSON.parse(body);

      if (uuidValidate(id)) {
        const userIdx: number = this.users.findIndex((user) => user.id === id);
        let user = userIdx !== -1 ? this.users[userIdx] : null;

        if (user) {
          user = {
            ...user,
            username: username || user.username,
            age: age || user.age,
            hobbies: hobbies || user.hobbies,
          };
          this.users[userIdx] = { ...user };
          resolve(user);
        } else {
          reject(404);
        }
      } else {
        reject(400);
      }
    });
  }
}

let usersDB: Users = new Users();

export { usersDB };
