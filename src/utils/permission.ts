import { RolePermission, rolesPermissions, UserRole } from '@src/utils/rolesConfig';
import { getLoggedUser, LoggedUser } from '@src/utils/loggedUser';

export const isMatchPath = (route: string, path: string): boolean => {
  const regex = new RegExp('^' + route.replace(/:[^\s/]+/g, '([0-9]*)') + '+[/]?$');

  return !!path.match(regex);
};

export const hasPermission = (path: string): boolean => {
  const rolePermission: RolePermission | undefined = Object.values(rolesPermissions).find(
    (value: RolePermission) => value.path === path || isMatchPath(value.path, path)
  );

  if (!rolePermission) return true;

  const loggedUser: LoggedUser | null = getLoggedUser();

  if (!loggedUser || !loggedUser.role) return false;

  const loggedUserRole =
    loggedUser.role === UserRole.Admin || loggedUser.role === UserRole.Tester
      ? UserRole.Admin
      : loggedUser.role;

  return !!Object.entries(rolePermission.permission).find(
    ([role, value]: [string, boolean]) => value && role === loggedUserRole
  );
};
