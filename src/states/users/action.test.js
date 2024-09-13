/* eslint-disable no-underscore-dangle */
/**
 * skenario testing
 *
 * - asyncRegisterUser function
 *  - should dispatch actions and toast success correctly when register is successful
 *  - should dispatch actions and toast error correctly when register is failed
 */

import {
  describe, expect, it, vi, beforeEach, afterEach,
} from 'vitest';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import { asyncRegisterUser } from './action';

const fakeRegisteredUser = {
  name: 'Bryant Azazel',
  email: 'bryantazazel@example.com',
  password: 'azazel123456789',
};

const fakeErrorResponse = new Error('Daftar pengguna baru gagal');

describe('asyncRegisterUser function', () => {
  const dispatch = vi.fn();
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    dispatch.mockClear();
    api.register = api._register;
    delete api._register;
  });

  it('should dispatch actions and toast success correctly when register is successful', async () => {
    api.register = () => Promise.resolve();

    const spy = vi.spyOn(toast, 'success');
    await asyncRegisterUser(fakeRegisteredUser)(dispatch);

    expect(spy).toHaveBeenCalledWith('Daftar pengguna baru sukses');
  });

  it('should dispatch actions and toast error correctly when register is failed', async () => {
    const spy = vi.spyOn(toast, 'error');
    api.register = () => Promise.reject(fakeErrorResponse);

    await asyncRegisterUser(fakeRegisteredUser)(dispatch);

    expect(spy).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
