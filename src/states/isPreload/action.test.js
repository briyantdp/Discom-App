/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */

/**
 *Test case for isPreload thunk
 *
 * - asyncPreloadProcess
 *  - should dispatch action when data fetching success
 */

import {
  beforeEach, afterEach, describe, expect, it, vi,
} from 'vitest';

import api from '../../utils/api';

import { asyncPreloadProcess } from './action';

describe('asyncPreloadProcess thunk', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    api._login = api.login;
  });

  afterEach(() => {
    api.login = api._login;

    delete api._login;
  });

  it('should dispatch action when data fetching success', async () => {
    api.login = () => Promise.resolve({ email: 'thomasalva@dicoding.com', password: 'thomasalva123' });

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalled();
  });
});
