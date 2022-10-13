/* eslint-disable no-unused-vars */
import rolesPermissions from './rolesPermission.json';

interface RolePermission {
  path: string;
  permission: {
    Admin: boolean;
    Tester: boolean;
    EndUser: boolean;
  };
}

interface RoleConfig {
  portalDashboard: RolePermission;
}

export enum UserRole {
  Admin = 'Admin',
  Tester = 'Tester',
  EndUser = 'EndUser',
}

export { RolePermission, RoleConfig, rolesPermissions };
