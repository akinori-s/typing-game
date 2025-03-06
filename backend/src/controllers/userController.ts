import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.fetchAllUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.fetchUserById(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return ;
  }
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
};
