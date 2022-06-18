interface UsersStore<T> {
  getUsers(): Array<T>;
  getUser(id: string): T | null;
  createUser(newUser: string): Promise<T | null>;
}

export { UsersStore };
