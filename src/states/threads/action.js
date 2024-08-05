import { showLoading, hideLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';

import { addCategoryActionCreator } from '../categories/action';

import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  FILTER_THREADS_BY_CATEGORY: 'FILTER_THREADS_BY_CATEGORY',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  NEUTRALIZE_VOTE_THREAD: 'NEUTRALIZE_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
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

function upVoteThreadActionCreator({ userId, threadId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function neutralizeVoteThreadActionCreator({ userId, threadId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function downVoteThreadActionCreator({ userId, threadId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { categories } = getState();
    const isCategoryExist = categories.includes(category);

    try {
      const newThread = await api.createThread({ title, body, category });
      if (!isCategoryExist) {
        dispatch(addCategoryActionCreator(newThread.category));
      }
      dispatch(addThreadActionCreator(newThread));
      toast.success('Diskusi baru berhasil ditambahkan');
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(showLoading());
    dispatch(upVoteThreadActionCreator({ userId: authUser.id, threadId }));

    try {
      await api.upVoteThread(threadId);
      toast.success('Upvote diskusi berhasil!');
    } catch (error) {
      toast.error(error.message);
      dispatch(upVoteThreadActionCreator({ userId: authUser.id, threadId }));
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(showLoading());
    dispatch(
      neutralizeVoteThreadActionCreator({ userId: authUser.id, threadId }),
    );

    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      dispatch(
        neutralizeVoteThreadActionCreator({ userId: authUser.id, threadId }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(showLoading());
    dispatch(downVoteThreadActionCreator({ userId: authUser.id, threadId }));

    try {
      await api.downVoteThread(threadId);
      toast.success('Downvote diskusi berhasil!');
    } catch (error) {
      toast.error(error.message);
      dispatch(downVoteThreadActionCreator({ userId: authUser.id, threadId }));
    }

    dispatch(hideLoading());
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
