import * as actions from '../actionTypes/auth';
import { Repo } from '../actionTypes/auth';

export interface AuthState {
  repos: Repo[];
}

const initialState: AuthState = {
  repos: [],
};

export default function authReducer(
  state: AuthState = initialState,
  action: actions.AuthAction
): AuthState {
  switch (action.type) {
    case actions.SET_GITHUB_REPOS:
    case actions.GET_GITHUB_REPOS_SUCCESS:
      return {
        ...state,
        repos: action.repos,
      };

    default:
      return state;
  }
}
