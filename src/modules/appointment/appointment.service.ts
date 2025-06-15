import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  AppointmentFilter,
  CreateAppointmentReq,
  UpdateAppointmentReq,
} from './dto/request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(input: CreateAppointmentReq) {
    const appointment = await this.prisma.appointment.create({
      data: input,
    });
    return appointment;
  }

  async getAppointmentFilterOptions() {
    const optionList = await this.prisma.appointment.findMany({
      select: { id: true, title: true },
    });
    return optionList;
  }

  async findAll(input: AppointmentFilter) {
    const filter: AppointmentFilter = {
      title: input.title || undefined,
      date: input.date || undefined,
      doctorId: input.doctorId || undefined,
      patientId: input.patientId || undefined,
    };

    const appointment = await this.prisma.appointment.findMany({
      where: filter,
      include: {
        Doctor: { select: { username: true } },
        Patient: { select: { firstName: true, lastName: true } },
      },
    });
    const res = appointment.map((ap) => {
      const temp = {
        ...ap,
        doctorName: ap.Doctor.username,
        patientName: `${ap.Patient.firstName} ${ap.Patient.lastName}`,
      };
      delete temp.Doctor;
      delete temp.Patient;
      return temp;
    });
    return res;
  }

  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        Doctor: { select: { username: true } },
        Patient: { select: { firstName: true, lastName: true } },
      },
    });
    if (!appointment) {
      throw new HttpException('Appointment Not Found', HttpStatus.BAD_REQUEST);
    }
    const res = {
      ...appointment,
      doctorName: appointment.Doctor.username,
      patientName: `${appointment.Patient.firstName} ${appointment.Patient.lastName}`,
    };
    delete res.Doctor;
    delete res.Patient;
    return res;
  }

  async update(id: number, input: UpdateAppointmentReq) {
    await this.prisma.appointment.update({ where: { id }, data: input });
    return { message: `This action updates a #${id} appointment` };
  }

  async remove(id: number) {
    await this.prisma.appointment.delete({ where: { id } });
    return { message: `This action deletes a #${id} appointment` };
  }
}
