/* eslint-disable max-len */
/**
 * test scenario for categoriesReducer
 *
 * - categoriesReducer function
 *   - should return the initial state when given an unknown action
 *   - should return categories when given by categories/receive action
 *   - should return add category in categories when given by categories/add action
 *
 */

import { describe, expect, it } from 'vitest';
import categoriesReducer from './reducer';

const fakeCategoriesResponse = [
  'redux', 'perkenalan', 'test',
];

describe('categoriesReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [];

    const action = {
      type: 'UNKNOWN',
    };

    const nextState = categoriesReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return categories when given by categories/receive action', () => {
    const initialState = [];

    const action = {
      type: 'categories/receive',
      payload: {
        categories: fakeCategoriesResponse,
      },
    };

    const nextState = categoriesReducer(initialState, action);

    expect(nextState).toEqual(action.payload.categories);
  });

  it('should return add category in categories when given by categories/add action', () => {
    const initialState = fakeCategoriesResponse;
    const newCategory = 'bug-fixing';

    const action = {
      type: 'categories/add',
      payload: {
        category: newCategory,
      },
    };

    const nextState = categoriesReducer(initialState, action);

    expect(nextState).toEqual([...initialState, action.payload.category]);
  });
});
