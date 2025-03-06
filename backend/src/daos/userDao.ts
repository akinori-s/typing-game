import { pool } from '../config/db';
import { IUser } from '../types';

export class UserDao {
  private db = pool;

  async getAllUsers(): Promise<IUser[]> {
    const result = await this.db.query('SELECT now()');
    // const result = await this.db.query('SELECT * FROM "user"');
    return result.rows as IUser[];
  }

  async getUserById(id: string): Promise<IUser | null> {
    const result = await this.db.query('SELECT * FROM "user" WHERE id = $1', [id]);
    return result.rows.length > 0 ? (result.rows[0] as IUser) : null;
  }

  async createUser(data: { name: string; email: string; password: string }): Promise<IUser> {
    const { name, email, password } = data;
    const result = await this.db.query(
      'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    return result.rows[0] as IUser;
  }
}

export const userDao = new UserDao();
