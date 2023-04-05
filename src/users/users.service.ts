import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../typeorm/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.create({
      ...createUserDto,
      createdAt: new Date().toDateString(),
    });
    await this.userRepository.save(createdUser);
    return createdUser;
  }

  findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username: username },
    });
  }
}
