import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

// Objek untuk menyimpan nama tipe action
const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator(authUser) {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    // Menampilkan loading saat proses set autentikasi user
    dispatch(showLoading());

    // Proses login
    try {
      // Mendapatkan token untuk akses login
      const token = await api.login({ email, password });

      // Memasukkan token ke localStorage
      api.putAccessToken(token);

      // Mendapatkan data user
      const authUser = api.getOwnProfile();

      // Dispatch setAuthUserActionCreator dengan payload dari data user
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }

    // Sembunyikan loading ketika proses sudah selesai
    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken("");
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
