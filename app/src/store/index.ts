import Vue from "vue";
import Vuex from "vuex";

import project from "./project.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { project },
});
