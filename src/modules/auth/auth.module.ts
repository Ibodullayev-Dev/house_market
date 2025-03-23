import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../../configs';
import { UsersModule } from '../users/users.module';
import { TokenGenerator } from '../../common/services/token.service';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync(JwtConfig),

    TypeOrmModule.forFeature([User]),

    forwardRef(() => UsersModule)

  ],
  controllers: [AuthController],
  providers: [AuthService, TokenGenerator],
})
export class AuthModule { }
