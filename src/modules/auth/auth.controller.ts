import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi muvaffaqiyatli yaratildi.' })
  @ApiResponse({ status: 400, description: 'Yaroqsiz ma‘lumotlar.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Foydalanuvchini tizimga kirishi' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli login.' })
  @ApiResponse({ status: 401, description: 'Noto‘g‘ri login yoki parol.' })
  login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tokenni yangilash' })
  @ApiResponse({ status: 200, description: 'Token muvaffaqiyatli yangilandi.' })
  @ApiResponse({ status: 401, description: 'Token yaroqsiz yoki muddati o‘tgan.' })
  refresh(@Req() req: Request) {
    return this.authService.refresh(req?.user);
  }
}
