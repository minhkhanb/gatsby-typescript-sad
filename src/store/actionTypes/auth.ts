export interface Repo {
  name: string;
}

export const SET_GITHUB_REPOS = '@auth/SET_GITHUB_REPOS';
export interface SetGithubReposAction {
  type: typeof SET_GITHUB_REPOS;
  repos: Repo[];
}

export const GET_GITHUB_REPOS = '@auth/GET_GITHUB_REPOS';
export interface GetGithubReposAction {
  type: typeof GET_GITHUB_REPOS;
}

export const GET_GITHUB_REPOS_REQUEST = '@auth/GET_GITHUB_REPOS_REQUEST';

export interface GetGithubReposRequestAction {
  type: typeof GET_GITHUB_REPOS_REQUEST;
}

export const GET_GITHUB_REPOS_SUCCESS = '@auth/GET_GITHUB_REPOS_SUCCESS';
export interface GetGithubReposSuccessAction {
  type: typeof GET_GITHUB_REPOS_SUCCESS;
  repos: Repo[];
}

export const GET_GITHUB_REPOS_FAILURE = '@auth/GET_GITHUB_REPOS_FAILURE';
export interface GetGithubReposFailureAction {
  type: typeof GET_GITHUB_REPOS_FAILURE;
  error: Error | string;
}

export type AuthAction =
  | SetGithubReposAction
  | GetGithubReposAction
  | GetGithubReposRequestAction
  | GetGithubReposSuccessAction
  | GetGithubReposFailureAction;
