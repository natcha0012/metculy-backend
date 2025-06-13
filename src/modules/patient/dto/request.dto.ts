import { IsOptional, IsString, Matches } from 'class-validator';
import { nationalIDRegex, phoneNumberRegex } from 'src/constants/regex';

export class CreatePatientRequest {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @Matches(nationalIDRegex, { message: 'nationalID is in wrong format' })
  nationalId: string;

  @IsString()
  @Matches(phoneNumberRegex, { message: 'phonenumber is in wrong format' })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  detail: string;
}

export class UpdatePatientRequest {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  @Matches(nationalIDRegex, { message: 'nationalID is in wrong format' })
  nationalId: string;

  @IsOptional()
  @IsString()
  @Matches(phoneNumberRegex, { message: 'phonenumber is in wrong format' })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  detail: string;
}
