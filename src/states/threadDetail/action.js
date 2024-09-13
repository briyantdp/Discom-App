import { showLoading, hideLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';

import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'threadDetail/receive',
  UP_VOTE_THREAD_DETAIL: 'threadDetail/up-vote',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'threadDetail/neutralize-vote',
  DOWN_VOTE_THREAD_DETAIL: 'threadDetail/down-vote',
  ADD_COMMENT: 'comment/add',
  UP_VOTE_COMMENT: 'comment/up-vote',
  NEUTRALIZE_VOTE_COMMENT: 'comment/neutralize-vote',
  DOWN_VOTE_COMMENT: 'comment/down-vote',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function upVoteThreadDetailActionCreator({ userId, threadId }) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
      threadId,
    },
  };
}

function neutralizeVoteThreadDetailActionCreator({ userId, threadId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
    payload: {
      userId,
      threadId,
    },
  };
}

function downVoteThreadDetailActionCreator({ userId, threadId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
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

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
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

function asyncUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(showLoading());
    dispatch(
      upVoteThreadDetailActionCreator({ userId: authUser.id, threadId }),
    );

    try {
      await api.upVoteThread(threadId);
      toast.success('Upvote diskusi berhasil!');
    } catch (error) {
      toast.error(error.message);
      dispatch(
        upVoteThreadDetailActionCreator({ userId: authUser.id, threadId }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(showLoading());
    dispatch(
      neutralizeVoteThreadDetailActionCreator({ userId: authUser.id, threadId }),
    );

    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      dispatch(
        neutralizeVoteThreadDetailActionCreator({
          userId: authUser.id,
          threadId,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(showLoading());
    dispatch(
      downVoteThreadDetailActionCreator({ userId: authUser.id, threadId }),
    );

    try {
      await api.downVoteThread(threadId);
      toast.success('Downvote diskusi berhasil!');
    } catch (error) {
      toast.error(error.message);
      dispatch(
        downVoteThreadDetailActionCreator({ userId: authUser.id, threadId }),
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
  receiveThreadDetailActionCreator,
  addCommentActionCreator,
  upVoteThreadDetailActionCreator,
  neutralizeVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  upVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  downVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncUpVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncUpVoteComment,
  asyncNeutralizeVoteComment,
  asyncDownVoteComment,
};
