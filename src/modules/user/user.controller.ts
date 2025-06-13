import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../guards/auth.guard';
import { CreateUserReq, UpdateUsersReq } from './dto/request.dto';
import { Auth } from 'src/decorator/auth.decorator';
import { UserRole } from 'src/enums/user.enum';
import { UserData } from 'src/decorator/user.decorator';
import { UserTokenPayload } from 'src/types/token.type';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(UserRole.ADMIN, UserRole.DOCTOR)
  @Post()
  async createUser(
    @Body() input: CreateUserReq,
    @UserData() user: UserTokenPayload,
  ) {
    return this.userService.createUser(input, user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUsersReq) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
