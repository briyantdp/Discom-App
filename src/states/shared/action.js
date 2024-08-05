/* eslint-disable import/prefer-default-export */

import { showLoading, hideLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';

import api from '../../utils/api';

import { receiveCategoriesActionCreator } from '../categories/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      const categories = threads.map((thread) => thread.category);

      dispatch(receiveCategoriesActionCreator([...new Set(categories)]));
      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
}

export { asyncPopulateUsersAndThreads };
