import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { TokenGenerator } from '../../common/services/token.service';
import * as bcryptjs from "bcryptjs"
import { LoginAuthDto } from './dto/login.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly tokenService: TokenGenerator,
  ) { }

  // register
  async create(createUserDto: CreateUserDto): Promise<{
    accessToken: string,
    accessExpiresIn: string,
    user: Partial<Omit<User, "password">>
  }> {
    try {

      const existingUser = await this.userRepo.findOne({
        where: {
          login: createUserDto.login,
          email: createUserDto.email
        }
      })

      if (existingUser) throw new ConflictException('Already existing user')

      const newUser: User = this.userRepo.create(createUserDto)

      const hashedPassword: string = await bcryptjs.hash(newUser.password, 8)
      newUser.password = hashedPassword

      const [savedUser, token] = await Promise.all([
        this.userRepo.save(newUser),
        this.tokenService.generator(newUser)
      ])

      const { password, role, ...user } = savedUser

      return {
        user: user,
        accessToken: token.accToken,
        accessExpiresIn: token.accessExpiresIn,
      }
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }


  // login
  async login(loginDto: LoginAuthDto): Promise<{
    accessToken: string,
    accessExpiresIn: string,
    refreshToken: string,
    refreshExpiresIn: string
  }> {
    try {
      const user: User = await this.userRepo.findOne({ where: { login: loginDto.login } })
      if (!user) throw new UnauthorizedException(`Unauthorized user!`)

      const checkPassword = await bcryptjs.compare(loginDto.password, user.password)
      if (!checkPassword) throw new UnauthorizedException(`Incorrect password`)

      const tokens = await this.tokenService.generator(user)

      return {
        accessToken: tokens.accToken,
        accessExpiresIn: tokens.accessExpiresIn,
        refreshToken: tokens.refToken,
        refreshExpiresIn: tokens.refreshExpiresIn
      }
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }


  // refresh
  async refresh(user: User): Promise<{
    accessToken: string,
    accessExpiresIn: string,
  }> {
    try {
      const tokens = await this.tokenService.generator(user)

      return {
        accessToken: tokens.accToken,
        accessExpiresIn: tokens.accessExpiresIn,
      }
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
