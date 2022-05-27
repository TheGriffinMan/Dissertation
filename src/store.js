import Vuex from "vuex";
import Vue from "vue";

import modules from "./store/";
const vuexOptions = {
    modules: modules,
    state: {},
    mutations: {},
    actions: {},
    plugins: []
};

Vue.use(Vuex);
export default new Vuex.Store(vuexOptions);