import { ActionType } from "./action";

function detailThreadReducer(detailThread = {}, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      console.log(action.payload.detailThread);
      return action.payload.detailThread;
    case ActionType.UP_VOTE_THREAD:
    case ActionType.NEUTRALIZE_VOTE_THREAD:
    case ActionType.DOWN_VOTE_THREAD:
      if (detailThread.id !== action.payload.threadId) {
        return detailThread;
      }
      return {
        ...detailThread,
        votes: action.payload.votes,
      };
    case ActionType.ADD_COMMENT:
      return {
        ...detailThread,
        comments: [...detailThread.comments, action.payload.comment],
      };
    case ActionType.UP_VOTE_COMMENT:
    case ActionType.NEUTRALIZE_VOTE_COMMENT:
    case ActionType.DOWN_VOTE_COMMENT:
      if (detailThread.id !== action.payload.threadId) {
        return detailThread;
      }
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) =>
          comment.id === action.payload.commentId
            ? { ...comment, votes: action.payload.votes }
            : comment
        ),
      };
    default:
      return detailThread;
  }
}

export default detailThreadReducer;
