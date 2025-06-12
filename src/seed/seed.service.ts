import { Injectable } from '@nestjs/common';
import { users } from './data';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}
  async seed() {
    await this.prisma.user.createMany(users);
  }
}
