/* eslint-disable max-len */
/**
 * test scenario for isPreloadReducer
 *
 * - isPreloadReducer function
 *   - should return the initial state when given an unknown action
 *   - should return categories when given by isPreload/set action
 *
 */

import { describe, expect, it } from 'vitest';
import isPreloadReducer from './reducer';

describe('isPreloadReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = true;

    const action = {
      type: 'UNKNOWN',
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return categories when given by isPreload/set action', () => {
    const initialState = true;

    const action = {
      type: 'isPreload/set',
      payload: {
        isPreload: false,
      },
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(action.payload.isPreload);
  });
});
