import Vue from "vue";
import Vuex from "vuex";

import { projectModule } from "./project.module";
import { timeModule } from "./time.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { projectModule, timeModule },
});
