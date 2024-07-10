import { showLoading, hideLoading } from "react-redux-loading-bar";

import api from "../../utils/api";

const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  ADD_THREAD: "ADD_THREAD",
  UP_VOTE_THREAD: "UP_VOTE_THREAD",
  NEUTRALIZE_VOTE_THREAD: "NEUTRALIZE_VOTE_THREAD",
  DOWN_VOTE_THREAD: "DOWN_VOTE_THREAD",
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ userId, threadId, voteType }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      userId,
      threadId,
      voteType,
    },
  };
}

function neutralizeVoteThreadActionCreator({ userId, threadId, voteType }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: {
      userId,
      threadId,
      voteType,
    },
  };
}

function downVoteThreadActionCreator({ userId, threadId, voteType }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      userId,
      threadId,
      voteType,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteThreadActionCreator({ userId: authUser.id, threadId }));

    try {
      const { userId, threadId, voteType } = await api.upVoteThread(threadId);

      dispatch(upVoteThreadActionCreator({ userId, threadId, voteType }));
    } catch (error) {
      alert(error.message);
      dispatch(upVoteThreadActionCreator({ userId: authUser.id, threadId }));
    }
  };
}

function asyncNeutralizeVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      neutralizeVoteThreadActionCreator({ userId: authUser.id, threadId })
    );

    try {
      const { userId, threadId, voteType } = await api.neutralizeVoteThread(
        threadId
      );

      dispatch(
        neutralizeVoteThreadActionCreator({ userId, threadId, voteType })
      );
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeVoteThreadActionCreator({ userId: authUser.id, threadId })
      );
    }
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteThreadActionCreator({ userId: authUser.id, threadId }));

    try {
      const { userId, threadId, voteType } = await api.downVoteThread(threadId);

      dispatch(downVoteThreadActionCreator({ userId, threadId, voteType }));
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadActionCreator({ userId: authUser.id, threadId }));
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
  downVoteThreadActionCreator,
  asyncAddThread,
  asyncUpVoteThread,
  asyncNeutralizeVoteThread,
  asyncDownVoteThread,
};
