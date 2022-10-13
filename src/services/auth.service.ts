import { AxiosResponse } from 'axios';
import apiClient from '@src/utils/api';
import storage from '@src/utils/api/storage';
import { isBrowser, key, LoggedUser } from '@src/utils';
import { UserRole } from '@src/utils/rolesConfig';

export type LoginInput = {
  username: string;
  password: string;
};

export async function githubRepos(): Promise<AxiosResponse> {
  return apiClient.get('/users/octocat/repos');
}

export function getUser() {
  const user = storage.loadData(key);

  return isBrowser() && user ? JSON.parse(user) : {};
}

export function setUser(user: LoggedUser) {
  return storage.saveData(key, JSON.stringify(user));
}

export function handleLogin({ username, password }: LoginInput) {
  if (username === 'kha' && password === 'pass') {
    const user: LoggedUser = {
      userId: 'kha',
      role: UserRole.EndUser,
    };

    return setUser(user);
  }

  return false;
}

export function isLoggedIn() {
  const user = getUser();

  return !!user.userId;
}

export function logout(callback: () => void) {
  setUser({} as LoggedUser);

  if (typeof callback === 'function') {
    callback();
  }
}
