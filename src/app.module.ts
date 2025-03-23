import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig, JwtConfig, TypeOrmConfig } from './configs';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GloabalResponseFormatterInterceptors } from './interceptors/global-response.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(EnvConfig),

    JwtModule.registerAsync(JwtConfig),

    TypeOrmModule.forRootAsync(TypeOrmConfig),

    UsersModule,
    AuthModule

  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GloabalResponseFormatterInterceptors
    }
  ],
})
export class AppModule { }
