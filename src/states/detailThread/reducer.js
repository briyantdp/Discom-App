import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;
    case ActionType.UP_VOTE_DETAIL_THREAD:
      if (detailThread.id !== action.payload.threadId) {
        return detailThread;
      }
      return {
        ...detailThread,
        upVotesBy: [...detailThread.upVotesBy, action.payload.userId],
        downVotesBy: detailThread.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    case ActionType.NEUTRALIZE_VOTE_DETAIL_THREAD:
      if (detailThread.id !== action.payload.threadId) {
        return detailThread;
      }
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
        downVotesBy: detailThread.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    case ActionType.DOWN_VOTE_DETAIL_THREAD:
      if (detailThread.id !== action.payload.threadId) {
        return detailThread;
      }
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
        downVotesBy: [...detailThread.downVotesBy, action.payload.userId],
      };
    case ActionType.ADD_COMMENT:
      return {
        ...detailThread,
        comments: [...detailThread.comments, action.payload.comment],
      };
    case ActionType.UP_VOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => (comment.id === action.payload.commentId
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
        ...detailThread,
        comments: detailThread.comments.map((comment) => (comment.id === action.payload.commentId
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
        ...detailThread,
        comments: detailThread.comments.map((comment) => (comment.id === action.payload.commentId
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
      return detailThread;
  }
}

export default detailThreadReducer;
