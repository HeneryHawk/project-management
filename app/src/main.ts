import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { ValidationProvider } from "vee-validate";
import ApiService from "./common/api.service";
import moment from "moment";
import { VueMaskDirective } from "v-mask";

Vue.config.productionTip = false;

ApiService.init();

Vue.filter("formatDate", (value: string) => {
    if (value) moment(String(value)).format("dd.mm.yyyy");
});

Vue.component("ValidationProvider", ValidationProvider);
Vue.directive("mask", VueMaskDirective);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount("#app");
