import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

// Create a new user
router.post('/', (req, res) => userController.create(req, res));

// Get all users with optional filters
router.get('/', (req, res) => userController.findAll(req, res));

// Get user by ID
router.get('/:id', (req, res) => userController.findById(req, res));

// Update user
router.put('/:id', (req, res) => userController.update(req, res));

// Delete user
router.delete('/:id', (req, res) => userController.delete(req, res));

export default router;
