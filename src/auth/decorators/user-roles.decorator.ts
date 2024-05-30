import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../utils/user.roles.enum'; 

export const META_ROLES = 'roles';

export const UserRoles = (...args: UserRole[]) => SetMetadata(META_ROLES, args);