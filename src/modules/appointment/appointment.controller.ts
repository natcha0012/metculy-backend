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
import { AppointmentService } from './appointment.service';
import {
  AppointmentFilter,
  CreateAppointmentReq,
  UpdateAppointmentReq,
} from './dto/request.dto';
import { Auth } from 'src/decorator/auth.decorator';
import { UserRole } from 'src/enums/user.enum';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Auth(UserRole.ADMIN, UserRole.DOCTOR)
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentReq) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Post('/get-by-filters')
  findAll(@Body() filter: AppointmentFilter) {
    return this.appointmentService.findAll(filter);
  }

  @Get('/filter-options')
  getAppointmentFilterOptions() {
    return this.appointmentService.getAppointmentFilterOptions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Auth(UserRole.ADMIN, UserRole.DOCTOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentReq,
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Auth(UserRole.ADMIN, UserRole.DOCTOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
