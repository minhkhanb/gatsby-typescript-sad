import * as actions from '../actionTypes/auth';
import { Repo } from '../actionTypes/auth';

export function setGithubRepos(repos: Repo[]): actions.SetGithubReposAction {
  return {
    type: actions.SET_GITHUB_REPOS,
    repos,
  };
}

export function getGithubRepos(): actions.GetGithubReposAction {
  return {
    type: actions.GET_GITHUB_REPOS,
  };
}

export function getGithubReposRequest(): actions.GetGithubReposRequestAction {
  return {
    type: actions.GET_GITHUB_REPOS_REQUEST,
  };
}

export function getGithubReposSuccess(repos: Repo[]): actions.GetGithubReposSuccessAction {
  return {
    type: actions.GET_GITHUB_REPOS_SUCCESS,
    repos,
  };
}

export function getGithubReposFailure(error: Error | string): actions.GetGithubReposFailureAction {
  return {
    type: actions.GET_GITHUB_REPOS_FAILURE,
    error,
  };
}
