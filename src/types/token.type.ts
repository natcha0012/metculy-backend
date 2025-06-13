import { UserRole } from 'src/enums/user.enum';

export type UserTokenPayload = {
  id: number;
  username: string;
  role: UserRole;
  branchId: number;
  branchMasterId: number;
  tokenVersion: number;
};
