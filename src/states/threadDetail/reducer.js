import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.UP_VOTE_THREAD_DETAIL:
      if (threadDetail.id !== action.payload.threadId) {
        return threadDetail;
      }
      return {
        ...threadDetail,
        upVotesBy: [...threadDetail.upVotesBy, action.payload.userId],
        downVotesBy: threadDetail.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    case ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL:
      if (threadDetail.id !== action.payload.threadId) {
        return threadDetail;
      }
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
        downVotesBy: threadDetail.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    case ActionType.DOWN_VOTE_THREAD_DETAIL:
      if (threadDetail.id !== action.payload.threadId) {
        return threadDetail;
      }
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
        downVotesBy: [...threadDetail.downVotesBy, action.payload.userId],
      };
    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [...threadDetail.comments, action.payload.comment],
      };
    case ActionType.UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => (comment.id === action.payload.commentId
          ? {
            ...comment,
            upVotesBy: [...comment.upVotesBy, action.payload.userId],
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
          }
          : comment)),
      };
    case ActionType.NEUTRALIZE_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => (comment.id === action.payload.commentId
          ? {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
          }
          : comment
        )),
      };
    case ActionType.DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => (comment.id === action.payload.commentId
          ? {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
            downVotesBy: [...comment.downVotesBy, action.payload.userId],
          }
          : comment)),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
