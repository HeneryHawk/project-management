<template>
    <v-dialog v-model="dialogOpen" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Neues Projekt</span>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="newProject.name" label="Name*" required />
                    <v-text-field v-model="newProject.customer" label="Kunde*" required />
                    <v-select v-model="newProject.status" label="Status*" :items="statusList" item-value="id" item-text="text" required />
                </v-form>
                <small>*Pflichtfelder</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="cancel"> Abbrechen </v-btn>
                <v-btn color="primary" depressed text @click="save"> Sichern </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import store from "./../store";
import { IProject } from "./../types/IProject";

@Component({
    computed: {
        ...mapGetters(["projects"]),
    },
})
export default class NewProjectDialog extends Vue {
    resolve: any;
    reject: any;

    data(): Record<string, any> {
        return {
            statusList: [
                { id: 0, text: "Initial" },
                { id: 1, text: "laufend" },
                { id: 2, text: "abgeschlossen" },
                { id: 3, text: "abgerechnet" },
            ],
            dialogOpen: false,
            newProject: {
                name: "",
                customer: "",
                status: 0,
            },
        };
    }

    open(): Promise<void> {
        this.$data.dialogOpen = true;
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    save(): void {
        this.resolve();
        const newProject = this.$data.newProject;
        const payload: IProject = {
            name: newProject.name,
            customer: newProject.customer,
            start: new Date(),
            status: newProject.status,
        };
        store.dispatch("saveProject", payload).then(() => {
            this.$data.dialogOpen = false;
        });
    }

    cancel(): void {
        this.resolve();
        this.$data.dialogOpen = false;
    }
}
</script>
