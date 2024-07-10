import { ActionType } from "./action";

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [...threads, action.payload.thread];
    case ActionType.UP_VOTE_THREAD ||
      ActionType.NEUTRALIZE_VOTE_THREAD ||
      ActionType.DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) {
          return thread;
        }
        return {
          ...thread,
          ...action.payload,
        };
      });
    default:
      return threads;
  }
}

export default threadsReducer;
