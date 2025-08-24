import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { ICreateUser, IUpdateUser } from '../models/User';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Create a new user
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userData: ICreateUser = req.body;
      
      // Check if user with email already exists
      const existingUser = await this.userService.findByEmail(userData.email);
      if (existingUser) {
        res.status(400).json({ error: 'User with this email already exists' });
        return;
      }

      const user = await this.userService.create(userData);
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get all users with optional filters
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const filters = {
        name: req.query.name as string,
        email: req.query.email as string,
        age: req.query.age ? parseInt(req.query.age as string) : undefined
      };

      const users = await this.userService.findAll(filters);
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get user by ID
  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update user
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: IUpdateUser = req.body;

      const user = await this.userService.update(id, updateData);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Delete user
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.userService.delete(id);

      if (!deleted) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
