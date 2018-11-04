let mutations = {
  downloadUrlUpdate:(state,org) => {
    state.DOWNLOAD_URL = org;
  },
  userInfoUpdate:(state,org) => {
    state.userInfo = org;
  },
};

export default mutations;
