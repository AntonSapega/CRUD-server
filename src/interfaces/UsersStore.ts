interface UsersStore<T> {
  getUsers(): Array<T>;
  getUser(id: string): T | null;
  createUser(newUser: string): Promise<T | null>;
  update(id: string, body: string): Promise<T | null>;
  delete(id: string): Promise<number>;
}

export { UsersStore };
