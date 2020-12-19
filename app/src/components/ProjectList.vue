<template>
    <div class="projects">
        <div>Projekte</div>
        <v-list two-line>
            <template v-for="(item, index) in projects">
                <v-list-item :key="item._id">
                    <v-list-item-content>
                        <v-list-item-title v-text="item.name" />
                        <v-list-item-subtitle v-text="item.customer" />
                        <v-list-item-subtitle v-text="formatDate(item.start)" />
                        <v-list-item-action>
                            <v-list-item-action-text v-text="Bearbeiten" />
                        </v-list-item-action>
                    </v-list-item-content>
                </v-list-item>
                <v-divider v-if="index < projects.length - 1" :key="index" />
            </template>
        </v-list>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import moment from "moment";

@Component({
    computed: {
        ...mapGetters(["projects"]),
    },
    methods: {
        formatDate: value => {
            if (value) return moment(String(value)).format("DD.MM.yyyy");
        },
    },
})
export default class Projects extends Vue {}
</script>
