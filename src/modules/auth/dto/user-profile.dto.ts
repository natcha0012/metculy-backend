import { UserRole } from 'src/enums/user.enum';

export class UserProfile {
  token: string;
  username: string;
  role: UserRole;
  phoneNumber: string;
}
