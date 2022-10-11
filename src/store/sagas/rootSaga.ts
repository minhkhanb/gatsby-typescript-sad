import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import authSaga from './auth';

export default function* rootSaga(): Generator<AllEffect<ForkEffect<unknown>>, void, unknown> {
  yield all([fork(authSaga)]);
}
