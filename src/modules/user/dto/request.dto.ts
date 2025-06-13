import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { phoneNumberRegex } from 'src/constants/regex';
import { UserRole } from 'src/enums/user.enum';

export class CreateUserReq {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: string;

  @IsString()
  @IsOptional()
  @Matches(phoneNumberRegex, { message: 'phonenumber is in wrong format' })
  phoneNumber: string;
}

export class UpdateUsersReq {
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  @Matches(phoneNumberRegex, { message: 'phonenumber is in wrong format' })
  phoneNumber: string;
}
