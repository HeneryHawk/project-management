<template>
    <div class="projects">
        <v-data-table :headers="headers" :items="projects">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Projekte</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="showCreateDialog" class="ml-auto">Neues Projekt anlegen</v-btn>
                    <new-project-dialog ref="createDialog" />
                </v-toolbar>
            </template>

            <template v-slot:item.status="{ item }">
                <v-chip :color="getStatusColor(item.status)" :dark="item.status === 2 || item.status === 3">
                    {{ getStatusText(item.status) }}
                </v-chip>
            </template>
            <template v-slot:item.start="{ item }">
                <span>{{ formatDate(item.start) }}</span>
            </template>
        </v-data-table>
        <!-- <v-list two-line>
            <template v-for="(item, index) in projects">
                <v-list-item :key="item._id">
                    <v-list-item-content>
                        <v-list-item-title v-text="item.name" />
                        <v-list-item-subtitle v-text="item.customer" />
                        <v-list-item-subtitle v-text="formatDate(item.start)" />
                    </v-list-item-content>
                </v-list-item>
                <v-divider v-if="index < projects.length - 1" :key="index" />
            </template>
        </v-list> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mapGetters } from "vuex";
import NewProjectDialog from "./../components/NewProjectDialog.vue";
import moment from "moment";

@Component({
    components: {
        NewProjectDialog,
    },
    computed: {
        ...mapGetters(["projects"]),
    },
})
export default class Projects extends Vue {
    data(): Record<string, any> {
        return {
            headers: [
                { text: "Projektname", value: "name" },
                { text: "Kunde", value: "customer" },
                { text: "Status", value: "status" },
                { text: "Startdatum", value: "start" },
            ],
        };
    }

    showCreateDialog(): void {
        (this.$refs.createDialog as any).open().then(() => {
            console.log("test");
        });
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
