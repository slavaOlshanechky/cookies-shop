import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

export function createStore() {
  return configureStore({ reducer: rootReducer });
}
