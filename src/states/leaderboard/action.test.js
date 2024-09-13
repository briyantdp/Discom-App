/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */

/**
 *Test case for leaderboard thunk
 *
 * - asyncFetchLeaderboards
 *  - should dispatch action correctly when leaderboards fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  beforeEach, afterEach, describe, expect, it, vi,
} from 'vitest';
import toast from 'react-hot-toast';

import api from '../../utils/api';

import { receiveLeaderboardsActionCreator, asyncFetchLeaderboards } from './action';

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

const fakeErrorResponse = new Error('Oops, something went wrong');

describe('asyncFetchLeaderboards thunk', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;

    delete api._getLeaderboards;
  });

  it('should dispatch action correctly when leaderboards fetching success', async () => {
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    await asyncFetchLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(fakeLeaderboardsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    const spy = vi.spyOn(toast, 'error');

    await asyncFetchLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(spy).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
