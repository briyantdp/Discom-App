import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";

import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import leaderboardReducer from "./leaderboard/reducer";
import threadsReducer from "./threads/reducer";
import detailThreadReducer from "./detailThread/reducer";
import usersReducer from "./users/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    leaderboards: leaderboardReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
