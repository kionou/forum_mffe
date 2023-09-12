// user.js
const state = {
  user: JSON.parse(localStorage.getItem('loginUser')) || null,
};
const getters = {
  getUser: (state) => state.user,
};

const mutations = {
  SET_LOGGED_IN_USER(state, user) {
    state.user = user;
    localStorage.setItem('loginUser', JSON.stringify(user));
  },
  LOGOUT_USER(state) {
    state.user = null;
    localStorage.removeItem('loginUser'); // Supprimer l'utilisateur de localStorage lors de la déconnexion
  },
};

const actions = {
  loginUser({ commit }, userData) {
    console.log('SET_LOGGED_IN_USER',userData);
    commit('SET_LOGGED_IN_USER', userData );
    localStorage.setItem('loginUser', JSON.stringify(userData));
  },
  logoutUser({ commit }) {
    commit('LOGOUT_USER'); // Appeler la mutation de déconnexion lors de la déconnexion de l'
    localStorage.removeItem('loginUser');
  },
};



export default {
  state,
  mutations,
  actions,
  getters,
};
