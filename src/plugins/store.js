import Vue from "vue";
import Vuex from "vuex";
// import pathify from "./pathify";

// import { make } from "vuex-pathify";

Vue.use(Vuex);

const state = {
  currentVideoTime: 0
};
const mutations = {
  updateCurrentVideoTime(state, time) {
    state.currentVideoTime = time;
  }
};
const actions = {};

export default new Vuex.Store({
  // plugins: [pathify.plugin],
  state,
  mutations,
  actions
});
