import toast from 'react-hot-toast';

import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'users/receive',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async () => {
    try {
      await api.register({ name, email, password });
      toast.success('Daftar pengguna baru sukses');
    } catch (error) {
      toast.error(error.message);
    }
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
