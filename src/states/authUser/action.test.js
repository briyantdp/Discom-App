/* eslint-disable no-underscore-dangle */
/**
 * Test case for authUser thunk
 *
 * - asyncSetAuthUser function
 *  - should dispatch actions and toast success correctly when login is successful
 *  - should dispatch actions and toast error correctly when login is failed
 * - asyncUnsetAuthUser function
 *  - should dispatch actions and toast success correctly when logout is successful
 */

import {
  describe, expect, it, vi, beforeEach, afterEach,
} from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';

import { asyncSetAuthUser, asyncUnsetAuthUser } from './action';

import api from '../../utils/api';

const fakeLoginUser = {
  email: 'bryantazazel@example.com',
  password: 'azazel123456789',
};

const fakeErrorResponse = new Error('email or password is wrong');

describe('asyncSetAuthUser function', () => {
  const dispatch = vi.fn();
  beforeEach(() => {
    api._login = api.login;
  });

  afterEach(() => {
    dispatch.mockClear();
    api.login = api._login;
    delete api._login;
  });

  it('should dispatch actions and toast success correctly when login is successful', async () => {
    const spy = vi.spyOn(toast, 'success');

    api.login = () => Promise.resolve();

    await asyncSetAuthUser(fakeLoginUser)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(spy).toHaveBeenCalledWith('Login sukses');
  });

  it('should dispatch actions and toast error correctly when login is failed', async () => {
    const spy = vi.spyOn(toast, 'error');

    api.login = () => Promise.reject(fakeErrorResponse);

    await asyncSetAuthUser(fakeLoginUser)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(spy).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUnsetAuthUser function', () => {
  const dispatch = vi.fn();
  beforeEach(() => {
    api._login = api.login;
  });

  afterEach(() => {
    dispatch.mockClear();
    api.login = api._login;
    delete api._login;
  });

  it('should dispatch actions and toast success correctly when logout is successful', async () => {
    const spy = vi.spyOn(api, 'putAccessToken');

    await asyncUnsetAuthUser()(dispatch);

    expect(spy).toHaveBeenCalledWith('');
  });
});
