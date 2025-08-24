import { Repository } from 'typeorm';
import { AppDataSource } from '../config/ormconfig';
import { User, ICreateUser, IUpdateUser } from '../models/User';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  // Create a new user
  async create(userData: ICreateUser): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  // Find user by ID
  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // Get all users with optional filters
  async findAll(filters?: { name?: string; email?: string; age?: number }): Promise<User[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (filters?.name) {
      queryBuilder.andWhere('user.name ILIKE :name', { name: `%${filters.name}%` });
    }

    if (filters?.email) {
      queryBuilder.andWhere('user.email ILIKE :email', { email: `%${filters.email}%` });
    }

    if (filters?.age) {
      queryBuilder.andWhere('user.age = :age', { age: filters.age });
    }

    return await queryBuilder.orderBy('user.created_at', 'DESC').getMany();
  }

  // Update user
  async update(id: string, updateData: IUpdateUser): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    Object.assign(user, updateData);
    return await this.userRepository.save(user);
  }

  // Delete user
  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
