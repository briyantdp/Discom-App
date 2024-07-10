import { showLoading, hideLoading } from "react-redux-loading-bar";

import api from "../../utils/api";

const ActionType = {
  RECEIVE_DETAIL_THREAD: "RECEIVE_DETAIL_THREAD",
  UP_VOTE_THREAD: "UP_VOTE_THREAD",
  NEUTRALIZE_VOTE_THREAD: "NEUTRALIZE_VOTE_THREAD",
  DOWN_VOTE_THREAD: "DOWN_VOTE_THREAD",
  ADD_COMMENT: "ADD_COMMENT",
  UP_VOTE_COMMENT: "UP_VOTE_COMMENT",
  NEUTRALIZE_VOTE_COMMENT: "NEUTRALIZE_VOTE_COMMENT",
  DOWN_VOTE_COMMENT: "DOWN_VOTE_COMMENT",
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
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

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteCommentActionCreator({ userId, commentId, voteType }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      userId,
      commentId,
      voteType,
    },
  };
}

function neutralizeVoteCommentActionCreator({ userId, commentId, voteType }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: {
      userId,
      commentId,
      voteType,
    },
  };
}

function downVoteCommentActionCreator({ userId, commentId, voteType }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      userId,
      commentId,
      voteType,
    },
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    try {
      const detailThread = await api.getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
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

function asyncUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteCommentActionCreator({ userId: authUser.id, commentId }));

    try {
      const { userId, commentId, voteType } = await api.upVoteComment(
        threadId,
        commentId
      );
      dispatch(upVoteCommentActionCreator({ userId, commentId, voteType }));
    } catch (error) {
      alert(error.message);
      dispatch(upVoteCommentActionCreator({ userId: authUser.id, commentId }));
    }
  };
}

function asyncNeutralizeVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      neutralizeVoteCommentActionCreator({ userId: authUser.id, commentId })
    );

    try {
      const { userId, commentId, voteType } = await api.neutralizeVoteComment(
        threadId,
        commentId
      );
      dispatch(
        neutralizeVoteCommentActionCreator({ userId, commentId, voteType })
      );
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeVoteCommentActionCreator({ userId: authUser.id, commentId })
      );
    }
  };
}

function asyncDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteCommentActionCreator({ userId: authUser.id, commentId }));

    try {
      const { userId, commentId, voteType } = await api.downVoteComment(
        threadId,
        commentId
      );
      dispatch(downVoteCommentActionCreator({ userId, commentId, voteType }));
    } catch (error) {
      alert(error.message);
      dispatch(
        downVoteCommentActionCreator({ userId: authUser.id, commentId })
      );
    }
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  addCommentActionCreator,
  upVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
  downVoteThreadActionCreator,
  upVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  downVoteCommentActionCreator,
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncUpVoteThread,
  asyncNeutralizeVoteThread,
  asyncDownVoteThread,
  asyncUpVoteComment,
  asyncNeutralizeVoteComment,
  asyncDownVoteComment,
};
