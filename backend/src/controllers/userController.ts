import { Request, Response } from 'express';
import { userService } from '../services/userService';

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.fetchAllUsers();
  res.json(users);
};

const getUserById = async (req: Request, res: Response) => {
  const user = await userService.fetchUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

const createUser = async (req: Request, res: Response) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
};

export const userController = {
  getAllUsers,
  getUserById,
  createUser
};
