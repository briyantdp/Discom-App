/* eslint-disable max-len */
/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the authUser in initial state when given by authUser/set action
 *   - should return null in initial state when given by authUser/unset action
 *
 */

import { describe, expect, it } from 'vitest';
import authUserReducer from './reducer';

const fakeAuthUserResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

describe('authUserReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser in initial state when given by authUser/set action', () => {
    const initialState = [];
    const action = {
      type: 'authUser/set',
      payload: {
        authUser: fakeAuthUserResponse,
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null in initial state when given by authUser/unset action', () => {
    const initialState = { authUser: fakeAuthUserResponse };
    const action = {
      type: 'authUser/unset',
      payload: {
        authUser: null,
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(null);
  });
});
