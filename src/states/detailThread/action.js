import { showLoading, hideLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';

import api from '../../utils/api';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  UP_VOTE_DETAIL_THREAD: 'UP_VOTE_DETAIL_THREAD',
  NEUTRALIZE_VOTE_DETAIL_THREAD: 'NEUTRALIZE_VOTE_DETAIL_THREAD',
  DOWN_VOTE_DETAIL_THREAD: 'DOWN_VOTE_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function upVoteDetailThreadActionCreator({ userId, threadId }) {
  return {
    type: ActionType.UP_VOTE_DETAIL_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function neutralizeVoteDetailThreadActionCreator({ userId, threadId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_DETAIL_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function downVoteDetailThreadActionCreator({ userId, threadId }) {
  return {
    type: ActionType.DOWN_VOTE_DETAIL_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteCommentActionCreator({ userId, commentId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function neutralizeVoteCommentActionCreator({ userId, commentId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function downVoteCommentActionCreator({ userId, commentId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const detailThread = await api.getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
      toast.success('Komentar berhasil ditambahkan');
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteDetailThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(showLoading());
    dispatch(
      upVoteDetailThreadActionCreator({ userId: authUser.id, threadId }),
    );

    try {
      await api.upVoteThread(threadId);
      toast.success('Upvote diskusi berhasil!');
    } catch (error) {
      toast.error(error.message);
      dispatch(
        upVoteDetailThreadActionCreator({ userId: authUser.id, threadId }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteDetailThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(showLoading());
    dispatch(
      neutralizeVoteDetailThreadActionCreator({ userId: authUser.id, threadId }),
    );

    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      dispatch(
        neutralizeVoteDetailThreadActionCreator({
          userId: authUser.id,
          threadId,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteDetailThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(showLoading());
    dispatch(
      downVoteDetailThreadActionCreator({ userId: authUser.id, threadId }),
    );

    try {
      await api.downVoteThread(threadId);
      toast.success('Downvote diskusi berhasil!');
    } catch (error) {
      toast.error(error.message);
      dispatch(
        downVoteDetailThreadActionCreator({ userId: authUser.id, threadId }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(showLoading());
    dispatch(upVoteCommentActionCreator({ userId: authUser.id, commentId }));

    try {
      await api.upVoteComment(threadId, commentId);
      toast.success('Upvote komentar berhasil!');
    } catch (error) {
      toast.error(error.message);
      dispatch(upVoteCommentActionCreator({ userId: authUser.id, commentId }));
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(showLoading());
    dispatch(
      neutralizeVoteCommentActionCreator({ userId: authUser.id, commentId }),
    );

    try {
      await api.neutralizeVoteComment(threadId, commentId);
    } catch (error) {
      toast.error(error.message);
      dispatch(
        neutralizeVoteCommentActionCreator({ userId: authUser.id, commentId }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(showLoading());
    dispatch(downVoteCommentActionCreator({ userId: authUser.id, commentId }));

    try {
      await api.downVoteComment(threadId, commentId);
      toast.success('Downvote komentar berhasil!');
    } catch (error) {
      toast.error(error.message);
      dispatch(
        downVoteCommentActionCreator({ userId: authUser.id, commentId }),
      );
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  addCommentActionCreator,
  upVoteDetailThreadActionCreator,
  neutralizeVoteDetailThreadActionCreator,
  downVoteDetailThreadActionCreator,
  upVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  downVoteCommentActionCreator,
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncUpVoteDetailThread,
  asyncNeutralizeVoteDetailThread,
  asyncDownVoteDetailThread,
  asyncUpVoteComment,
  asyncNeutralizeVoteComment,
  asyncDownVoteComment,
};
