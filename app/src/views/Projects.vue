<template>
    <div class="projects">
        <h1>Projektübersicht</h1>
        <project-list />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Route, RawLocation } from "vue-router";
import ProjectList from "./../components/ProjectList.vue";
import store from "./../store";

@Component({
    components: {
        ProjectList,
    },
    beforeRouteEnter: (to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => void)) => void) => {
        store.dispatch("fetchProjects").then(() => next());
    },
})
export default class Projects extends Vue {}
</script>

<style scoped>
h1 {
    padding-bottom: 1rem;
}
</style>
