import { ActionType } from "./action";

function detailThreadReducer(detailThread = {}, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;
    case ActionType.UP_VOTE_THREAD ||
      ActionType.NEUTRALIZE_VOTE_THREAD ||
      ActionType.DOWN_VOTE_THREAD:
      if (detailThread.id !== action.payload.threadId) {
        return detailThread;
      }
      return {
        ...detailThread,
        ...action.payload,
      };
    case ActionType.ADD_COMMENT:
      return {
        ...detailThread,
        comments: [...detailThread.comments, action.payload.comment],
      };
    case ActionType.UP_VOTE_COMMENT ||
      ActionType.NEUTRALIZE_VOTE_COMMENT ||
      ActionType.DOWN_VOTE_COMMENT:
      if (detailThread.id !== action.payload.threadId) {
        return detailThread;
      }
      return {
        ...detailThread,
        ...action.payload,
      };
    default:
      return detailThread;
  }
}

export default detailThreadReducer;
