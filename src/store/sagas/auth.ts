/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, call, takeEvery, all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';

import { githubRepos } from 'src/services/auth.service';
import * as actionCreators from '../actionCreators/auth';
import * as actionTypes from '../actionTypes/auth';

function* fetchGithubRepos() {
  try {
    yield put(actionCreators.getGithubReposRequest());
    const { data } = yield call(githubRepos);

    yield put(actionCreators.getGithubReposSuccess(data));
  } catch (error) {
    yield put(actionCreators.getGithubReposFailure((error as any).response.data.error));
  }
}

function* watchGithubRepos() {
  yield takeEvery(actionTypes.GET_GITHUB_REPOS, fetchGithubRepos);
}

export default function* authSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(watchGithubRepos)]);
}
