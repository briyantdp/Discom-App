/* eslint-disable max-len */
/**
 * test scenario for threadsReducer
 *
 * - usersReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the initial state when given by users/receive action
 *
 */

import { describe, expect, it } from 'vitest';
import userReducer from './reducer';

const fakeUsersResponse = [
  {
    id: 'user-1arruYipuS9PIhPm',
    name: 'surya16',
    email: 'surya16@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=surya16&background=random',
  },
  {
    id: 'user-IAzgv2yzH3wDKtTq',
    name: 'JaGo',
    email: 'JaGo@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=JaGo&background=random',
  },
  {
    id: 'user-YDMKdVEY1pot3Tv1',
    name: 'Aziz',
    email: 'aziz@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=Aziz&background=random',
  },
  {
    id: 'user-yIzjuV38I-DpY2CR',
    name: 'dicoding',
    email: 'dicoding@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=dicoding&background=random',
  },
  {
    id: 'user-LBe6Uy9FXk17x-VI',
    name: 'Dustiness Ford Lalatina',
    email: 'darkness@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=Dustiness Ford Lalatina&background=random',
  },
];

describe('userReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = userReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the initial state when given by users/receive action', () => {
    const initialState = [];
    const action = {
      type: 'users/receive',
      payload: {
        users: fakeUsersResponse,
      },
    };

    const nextState = userReducer(initialState, action);

    expect(nextState).toEqual(action.payload.users);
  });
});
