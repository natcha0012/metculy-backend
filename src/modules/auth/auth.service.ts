import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { sha256Encrypt } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    const hashPassword = sha256Encrypt(password, user.salt, 10);
    if (user.password !== hashPassword) {
      throw new HttpException(
        'UNAUTHORIZED - Incorrect Password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = { id: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
