import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfig } from 'src/configs';
import { UsersModule } from '../users/users.module';
import { TokenGenerator } from 'src/common/services/token.service';

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
