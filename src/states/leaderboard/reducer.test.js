/* eslint-disable max-len */
/**
 * test scenario for leaderbordReducer
 *
 * - leaderbordReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the initial state when given by leaderboards/receive action
 *
 */

import { describe, expect, it } from 'vitest';
import leaderboardReducer from './reducer';

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'user-mQhLzINW_w5TxxYf',
      name: 'Dimas Saputra',
      email: 'dimas@dicoding.com',
      avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
    },
    score: 25,
  },
  {
    user: {
      id: 'user-pcML6-IV3zI7b-Ke',
      name: 'Bisnis',
      email: 'test222@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Bisnis&background=random',
    },
    score: 25,
  },
  {
    user: {
      id: 'user-1arruYipuS9PIhPm',
      name: 'surya16',
      email: 'surya16@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=surya16&background=random',
    },
    score: 0,
  },
  {
    user: {
      id: 'user-IAzgv2yzH3wDKtTq',
      name: 'JaGo',
      email: 'JaGo@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=JaGo&background=random',
    },
    score: 0,
  },
  {
    user: {
      id: 'user-YDMKdVEY1pot3Tv1',
      name: 'Aziz',
      email: 'aziz@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Aziz&background=random',
    },
    score: 0,
  },
  {
    user: {
      id: 'user-yIzjuV38I-DpY2CR',
      name: 'dicoding',
      email: 'dicoding@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=dicoding&background=random',
    },
    score: 0,
  },
  {
    user: {
      id: 'user-LBe6Uy9FXk17x-VI',
      name: 'Dustiness Ford Lalatina',
      email: 'darkness@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Dustiness Ford Lalatina&background=random',
    },
    score: 0,
  },
  {
    user: {
      id: 'user-pifFNgHtlDl5GaYB',
      name: 'airputih',
      email: 'airputih@mail.com',
      avatar: 'https://ui-avatars.com/api/?name=airputih&background=random',
    },
    score: 0,
  },
  {
    user: {
      id: 'user-aROWej8yYA1sOfHN',
      name: 'Dicoding',
      email: 'admin@dicoding.com',
      avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
    },
    score: 0,
  },
  {
    user: {
      id: 'user-3SipNdFkSbUWm02x',
      name: 'Ebayyou Anggoro',
      email: 'ebayyouggee@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Ebayyou Anggoro&background=random',
    },
    score: 0,
  },
];

describe('leaderboardReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = leaderboardReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the initial state when given by leaderboards/receive action', () => {
    const initialState = [];
    const action = {
      type: 'leaderboards/receive',
      payload: {
        leaderboards: fakeLeaderboardsResponse,
      },
    };

    const nextState = leaderboardReducer(initialState, action);

    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
