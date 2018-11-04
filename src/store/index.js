import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);

import state from './state';
import actions from './actions';
import mutations from './mutations';

let store = new vuex.Store({
  state,
  actions,
  mutations
});

export default store;
