import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthGuard } from 'src/common/guards/role.guard';
import { RolesEnum } from 'src/enums';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, AuthGuard)
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Get('all')
  @Roles(RolesEnum.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
