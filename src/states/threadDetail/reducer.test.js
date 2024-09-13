/* eslint-disable max-len */
/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the detail thread when given by threadDetail/receive action
 *   - should return the detail thread with the upvoted thread when given by threadDetail/up-vote action
 *   - should return the detail thread with the neutralized thread when given by threadDetail/neutralize-vote action
 *   - should return the detail thread with the downvoted thread when given by threadDetail/down-vote action
 *   - should return the detail thread with new comment when given by comment/add action
 *   - should return the detail thread with the upvoted thread when given by comment/up-vote action
 *   - should return the detail thread with the neutralized thread when given by comment/neutralize-vote action
 *   - should return the detail thread with the downvoted thread when given by comment/down-vote action
 */

import { describe, expect, it } from 'vitest';
import threadDetailReducer from './reducer';

const fakeThreadResponse = {
  id: 'thread-1',
  title: 'Bagaimana pengalamanmu belajar redux?',
  body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
  category: 'redux',
  createdAt: '2021-06-23T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
  comments: [],
};

describe('threadDetailReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the detail thread when given by threadDetail/receive action', () => {
    const initialState = [];
    const action = {
      type: 'threadDetail/receive',
      payload: {
        threadDetail: fakeThreadResponse,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return the detail thread with the upvoted thread when given by threadDetail/up-vote action', () => {
    const initialState = fakeThreadResponse;
    const action = {
      type: 'threadDetail/up-vote',
      payload: {
        userId: 'user-1',
        threadId: 'thread-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(
      {
        ...initialState,
        upVotesBy: [...initialState.upVotesBy, action.payload.userId],
        downVotesBy: initialState.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      },
    );
  });

  it('should return the detail thread with the neutralized thread when given by threadDetail/neutralize-vote action', () => {
    const initialState = fakeThreadResponse;
    const action = {
      type: 'threadDetail/neutralize-vote',
      payload: {
        userId: 'user-1',
        threadId: 'thread-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: initialState.upVotesBy.filter(
        (id) => id !== action.payload.userId,
      ),
      downVotesBy: initialState.downVotesBy.filter(
        (id) => id !== action.payload.userId,
      ),
    });
  });

  it('should return the detail thread with the downvoted thread when given by threadDetail/down-vote action', () => {
    const initialState = fakeThreadResponse;
    const action = {
      type: 'threadDetail/down-vote',
      payload: {
        userId: 'user-1',
        threadId: 'thread-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: initialState.upVotesBy.filter(
        (id) => id !== action.payload.userId,
      ),
      downVotesBy: [...initialState.downVotesBy, action.payload.userId],
    });
  });

  it('should return the detail thread with new comment when given by comment/add action', () => {
    const initialState = fakeThreadResponse;
    const action = {
      type: 'comment/add',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [...initialState.comments, action.payload.comment],
    });
  });

  it('should return the detail thread with the upvoted thread when given by comment/up-vote action', () => {
    const initialState = fakeThreadResponse;
    const action = {
      type: 'comment/up-vote',
      payload: {
        userId: 'user-1',
        threadId: 'thread-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(
      {
        ...initialState,
        comments: initialState.comments.map((comment) => (comment.id === action.payload.commentId
          ? {
            ...comment,
            upVotesBy: [...comment.upVotesBy, action.payload.userId],
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
          }
          : comment)),
      },
    );
  });

  it('should return the detail thread with the neutralized thread when given by comment/neutralize-vote action', () => {
    const initialState = fakeThreadResponse;
    const action = {
      type: 'comment/neutralize-vote',
      payload: {
        userId: 'user-1',
        threadId: 'thread-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(
      {
        ...initialState,
        comments: initialState.comments.map((comment) => (comment.id === action.payload.commentId
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
      },
    );
  });

  it('should return the detail thread with the downvoted thread when given by comment/down-vote action', () => {
    const initialState = fakeThreadResponse;
    const action = {
      type: 'comment/down-vote',
      payload: {
        userId: 'user-1',
        threadId: 'thread-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(
      {
        ...initialState,
        comments: initialState.comments.map((comment) => (comment.id === action.payload.commentId
          ? {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
            downVotesBy: [...comment.downVotesBy, action.payload.userId],
          }
          : comment)),
      },
    );
  });
});
