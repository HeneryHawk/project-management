<template>
    <div class="projects">
        <h1>Zeit buchen</h1>
        <create-time-form />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route, RawLocation } from "vue-router";
import store from "./../store";
import CreateTimeForm from "./../components/CreateTimeForm.vue";

@Component({
    components: { CreateTimeForm },
    beforeRouteEnter: (to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => void)) => void) => {
        store.dispatch("fetchProjects").then(() => next());
    },
})
export default class CreateTime extends Vue {}
</script>
