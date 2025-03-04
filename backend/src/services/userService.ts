import { userDao } from '../daos/userDao';
import { IUser } from '../types';

export class UserService {
  async fetchAllUsers(): Promise<IUser[]> {
    return await userDao.getAllUsers();
  }

  async fetchUserById(id: string): Promise<IUser | null> {
    return await userDao.getUserById(id);
  }

  async createUser(data: { name: string; email: string; password: string }): Promise<IUser> {
    return await userDao.createUser(data);
  }
}

export const userService = new UserService();