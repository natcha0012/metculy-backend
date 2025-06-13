import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { UserRole } from 'src/enums/user.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}
