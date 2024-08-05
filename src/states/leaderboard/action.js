import { showLoading, hideLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';

import api from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncFetchLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
}

export { ActionType, receiveLeaderboardsActionCreator, asyncFetchLeaderboards };
