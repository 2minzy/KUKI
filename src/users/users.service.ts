import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ success: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return {
          success: false,
          error: 'User already exist. Please sign up with another email',
        };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed creating account' };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{
    success: boolean;
    error?: string;
    token?: string;
  }> {
    try {
      const user = this.users.findOne({ email });
      if (!user) {
        return {
          success: false,
          error: 'User not found',
        };
      }
      const passwordCorrect = (await user).checkPassword(password);
      if (!passwordCorrect) {
        return {
          success: false,
          error: 'Wrong password',
        };
      }
      const token = this.jwtService.sign((await user).id);
      return {
        success: true,
        token,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
}
