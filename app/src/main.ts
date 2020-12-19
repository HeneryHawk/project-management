import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ApiService from "./common/api.service";
import moment from "moment";

Vue.config.productionTip = false;

ApiService.init();

Vue.filter("formatDate", (value: string) => {
    if (value) moment(String(value)).format("dd.mm.yyyy");
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount("#app");