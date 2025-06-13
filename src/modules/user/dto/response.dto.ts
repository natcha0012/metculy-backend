import { UserRole } from 'src/enums/user.enum';

export class UserResponse {
  id: number;
  username: string;
  role: UserRole;
  phoneNumber: string;
}
