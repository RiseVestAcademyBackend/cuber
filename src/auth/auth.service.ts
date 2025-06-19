import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    delete user.password; 
    return user;
  }

  async login(user: User): Promise<{ accessToken: string; user: User }> {
    const payload = { email: user.email, sub: user.id, role: user.role, name: user.name };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, user };
  }

  async register(data: Partial<User>): Promise<{ accessToken: string; user: User }> {
    const hashed = await bcrypt.hash(data.password, 10);
    const newUser = await this.usersService.create({
      ...data,
      password: hashed,
    });
    return this.login(newUser);
  }
}
