import { AppDataSource } from '../config/db';
import { IUser } from '../types';

export class UserDao {
  private db = AppDataSource;

  async getAllUsers(): Promise<IUser[]> {
    const result = await this.db.query('SELECT * FROM "user"');
    return result as IUser[];
  }

  async getUserById(id: string): Promise<IUser | null> {
    const result = await this.db.query('SELECT * FROM "user" WHERE id = $1', [id]);
    return result.length > 0 ? (result[0] as IUser) : null;
  }

  async createUser(data: { name: string; email: string; password: string }): Promise<IUser> {
    const { name, email, password } = data;
    const result = await this.db.query(
      'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    return result[0] as IUser;
  }
}

export const userDao = new UserDao();
