import { UserRole } from 'src/enums/user.enum';

export class UserProfile {
  token: string;
  id: number;
  username: string;
  role: UserRole;
  phoneNumber: string;
}
