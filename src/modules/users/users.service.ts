import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }

  // find all
  async findAll(): Promise<User[]> {
    try {

      const users: User[] = await this.userRepo.find()

      return users.map((el) => {
        delete el.password
        return el
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)

    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
