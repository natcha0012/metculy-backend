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
import { PatientService } from './patient.service';
import { CreatePatientRequest, UpdatePatientRequest } from './dto/request.dto';
import { UserRole } from 'src/enums/user.enum';
import { Auth } from 'src/decorator/auth.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Auth(UserRole.ADMIN, UserRole.DOCTOR)
  @Post()
  create(@Body() createPatientDto: CreatePatientRequest) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get('/filter-options')
  getPatientFilterOptions() {
    return this.patientService.getPatientFilterOptions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientRequest,
  ) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Auth(UserRole.ADMIN, UserRole.DOCTOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
