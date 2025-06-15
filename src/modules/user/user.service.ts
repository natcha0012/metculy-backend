import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserReq, UpdateUsersReq } from './dto/request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from 'src/enums/user.enum';
import { UserResponse } from './dto/response.dto';
import { generateSalt, sha256Encrypt } from 'src/utils';
import { UserTokenPayload } from 'src/types/token.type';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return {
      id: user.id,
      username: user.username,
      role: user.role as UserRole,
      phoneNumber: user.phoneNumber,
    };
  }

  async getDoctorFilterOptions() {
    const optionList = await this.prisma.user.findMany({
      where: { role: UserRole.DOCTOR },
      select: { id: true, username: true },
    });
    return optionList.map((option) => {
      return {
        id: option.id,
        name: option.username,
      };
    });
  }

  async createUser(
    input: CreateUserReq,
    user: UserTokenPayload,
  ): Promise<UserResponse> {
    if (user.role === UserRole.DOCTOR && input.role === UserRole.ADMIN) {
      throw new HttpException('PERMISSION_DENIED', HttpStatus.BAD_REQUEST);
    }
    const DupUser = await this.prisma.user.findUnique({
      where: { username: input.username },
    });

    if (DupUser) {
      throw new HttpException('USER_ALREADY_EXIST', HttpStatus.BAD_REQUEST);
    }

    const salt = generateSalt();

    const newUser = await this.prisma.user.create({
      data: {
        ...input,
        password: sha256Encrypt(input.password, salt, 10),
        salt,
      },
    });

    if (!newUser) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role as UserRole,
      phoneNumber: newUser.phoneNumber,
    };
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        role: user.role as UserRole,
        phoneNumber: user.phoneNumber,
      };
    });
  }

  async update(id: number, updateUserDto: UpdateUsersReq) {
    await this.prisma.user.update({ where: { id }, data: updateUserDto });
    return { message: `This action updates a #${id} user` };
  }

  async remove(id: number) {
    const appointment = await this.prisma.appointment.findFirst({
      where: { doctorId: id },
    });
    if (appointment) {
      throw new HttpException(
        "Please Doctor's Appointment",
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.user.delete({ where: { id } });
    return { message: `This action removes a #${id} user` };
  }
}
