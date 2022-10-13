import { isBrowser } from '@src/utils/index';
import { getUser, setUser } from '@src/services/auth.service';

export interface LoggedUser {
  userId: string;
  role: string;
}

export const key = 'loggedUser';

export const setLoggedUser = (user: LoggedUser): void => {
  if (isBrowser()) {
    setUser(user);
  }
};

export const getLoggedUser = (): LoggedUser | null => {
  try {
    if (isBrowser()) {
      return getUser();
    }
  } catch {}

  return null;
};
