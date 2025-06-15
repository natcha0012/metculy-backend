import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentReq {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  date: string;

  @IsNumber()
  doctorId: number;

  @IsNumber()
  patientId: number;
}

export class UpdateAppointmentReq {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsNumber()
  doctorId: number;

  @IsOptional()
  @IsNumber()
  patientId: number;
}

export class AppointmentFilter {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsNumber()
  doctorId: number;

  @IsOptional()
  @IsNumber()
  patientId: number;
}
