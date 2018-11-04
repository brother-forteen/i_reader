let actions = {
  downloadUrlUpdate:({commit},org) => {
    commit('downloadUrlUpdate',org);
  },
  userInfoUpdate: ({commit}, org) => {
    commit('userInfoUpdate',org);
  }
};

export default actions;
