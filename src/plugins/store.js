import Vue from "vue";
import Vuex from "vuex";
// import pathify from "./pathify";

// import { make } from "vuex-pathify";

Vue.use(Vuex);

const state = {
  currentVideoTime: 0,
  trackVideoTimeStatus: false
};
const mutations = {
  updateCurrentVideoTime(state, time) {
    console.log("updated", time);
    if (state.trackVideoTimeStatus) state.currentVideoTime = time;
  },
  switchCurrentVideoTimeStatus(state) {
    state.trackVideoTimeStatus = !state.trackVideoTimeStatus;
  }
};
const actions = {};

export default new Vuex.Store({
  // plugins: [pathify.plugin],
  state,
  mutations,
  actions
});
