import { combineReducers } from 'redux';
import isLoadingReducer from './isLoadingReducer';
import errorReducer from './errorReducer';
import authReducer from './auth';

const rootReducer = combineReducers({
  isLoading: isLoadingReducer,
  error: errorReducer,
  auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
