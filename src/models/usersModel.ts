import { usersDB } from '../data-base/users';
import { User } from '../interfaces/User';

//!!! ПЕРЕНЕСИ СЮДА ВСЕ МЕТОДЫ ИЗ USERS DB А В USERS ОСТАВЬ ТОЛЬКО САМ МАССИВ // ЛИБО ДРОПНИ ВООБЩЕ ВЕСЬ ЭТО ФАЙЛ А В USERS ДОБАВЬ ПРОМИСЫ

function getUsersList(): Promise<User[]> {
  return new Promise((resolve, reject) => {
    resolve(usersDB.getUsers());
  });
}

function getUser(identifier: string): Promise<User> {
  return new Promise((resolve) => {
    resolve(usersDB.getUser(identifier));
  });
}

export { getUsersList, getUser };
