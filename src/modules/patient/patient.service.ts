import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientRequest, UpdatePatientRequest } from './dto/request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreatePatientRequest) {
    const patient = await this.prisma.patient.create({
      data: input,
    });
    return patient;
  }

  async getPatientFilterOptions() {
    const optionList = await this.prisma.patient.findMany({
      select: { id: true, firstName: true, lastName: true },
    });
    return optionList.map((option) => {
      return {
        id: option.id,
        name: `${option.firstName} ${option.lastName}`,
      };
    });
  }

  findAll() {
    return this.prisma.patient.findMany();
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: { Appointment: { select: { id: true } } },
    });
    if (!patient) {
      throw new HttpException('Patient Not Found', HttpStatus.BAD_REQUEST);
    }
    const treatmentCount = patient.Appointment.length;
    delete patient.Appointment;
    return {
      ...patient,
      treatmentCount,
    };
  }

  async update(id: number, input: UpdatePatientRequest) {
    await this.prisma.patient.update({ where: { id }, data: input });
    return { message: `This action updates a #${id} patient` };
  }

  async remove(id: number) {
    const appointment = await this.prisma.appointment.findFirst({
      where: { patientId: id },
    });
    if (appointment) {
      throw new HttpException(
        "Please Patient's Appointment",
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.patient.delete({ where: { id } });
    return { message: `This action deletes a #${id} patient` };
  }
}
