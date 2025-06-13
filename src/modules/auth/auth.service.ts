import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { sha256Encrypt } from 'src/utils';
import { UserProfile } from './dto/user-profile.dto';
import { UserRole } from 'src/enums/user.enum';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<UserProfile> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = sha256Encrypt(password, user.salt, 10);
    if (user.password !== hashPassword) {
      throw new HttpException(
        'UNAUTHORIZED - Incorrect Password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      phoneNumber: user.phoneNumber,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      id: user.id,
      username: user.username,
      role: user.role as UserRole,
      phoneNumber: user.phoneNumber,
    };
  }
}
