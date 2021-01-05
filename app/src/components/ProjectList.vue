<template>
    <div class="projects">
        <v-data-table :headers="headers" :items="projects" item-key="_id">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Projekte</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="showCreateDialog" class="ml-auto">Neues Projekt anlegen</v-btn>
                    <ProjectDialog ref="createDialog" />
                </v-toolbar>
            </template>

            <template v-slot:[`item.status`]="{ item }">
                <v-chip :color="getStatusColor(item.status)" :dark="item.status === 2 || item.status === 3">
                    {{ getStatusText(item.status) }}
                </v-chip>
            </template>
            <template v-slot:[`item.start`]="{ item }">
                <span>{{ formatDate(item.start) }}</span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editProject(item)"> mdi-pencil </v-icon>
                <v-icon small @click="deleteProject(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters } from "vuex";
import ProjectDialog from "./../components/ProjectDialog.vue";
import moment from "moment";
import store from "./../store";
import { IProject } from "@/types/IProject";

@Component({
    components: {
        ProjectDialog,
    },
    computed: {
        ...mapGetters(["projects"]),
    },
})
export default class Projects extends Vue {
    private headers = [
        { text: "Projektname", value: "name" },
        { text: "Kunde", value: "customer" },
        { text: "Status", value: "status" },
        { text: "Startdatum", value: "start" },
        { text: "Aktionen", value: "actions" },
    ];

    showCreateDialog(): void {
        (this.$refs.createDialog as ProjectDialog).open();
    }

    editProject(item: IProject): void {
        (this.$refs.createDialog as ProjectDialog).open({ ...item });
    }

    deleteProject(item: IProject): void {
        store.dispatch("deleteProject", item);
    }

    formatDate(value: string): string {
        return value ? moment(String(value)).format("DD.MM.yyyy") : "";
    }

    getStatusText(status: number): string {
        switch (status) {
            case 0:
                return "Initial";
            case 1:
                return "laufend";
            case 2:
                return "abgeschlossen";
            case 3:
                return "abgerechnet";
            default:
                return "Nicht definiert";
        }
    }

    getStatusColor(status: number): string {
        switch (status) {
            case 0:
            case 1:
                return "";
            case 2:
                return "yellow";
            case 3:
                return "red";
            default:
                return "black";
        }
    }
}
</script>
