import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../users/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: [UserRole, ...UserRole[]]) =>
  SetMetadata(ROLES_KEY, roles);
