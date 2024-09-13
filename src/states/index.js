import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';

import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import leaderboardReducer from './leaderboard/reducer';
import categoriesReducer from './categories/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import usersReducer from './users/reducer';

export const setupStore = (preloadedState) => configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    leaderboards: leaderboardReducer,
    categories: categoriesReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
  },
  preloadedState,
});

const store = setupStore();

export default store;
