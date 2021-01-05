import Vue from "vue";
import Vuex from "vuex";

import { projectModule } from "./project.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { projectModule },
});
