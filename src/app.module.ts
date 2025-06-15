import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PatientModule } from './modules/patient/patient.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, PatientModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
