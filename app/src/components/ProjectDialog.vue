<template>
    <v-dialog v-model="dialogOpen" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Neues Projekt</span>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="project.name" label="Name*" required />
                    <v-text-field v-model="project.customer" label="Kunde*" required />
                    <v-menu
                        v-model="openStartPicker"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="formattedDate" label="Startdatum" readonly v-bind="attrs" v-on="on" required />
                        </template>
                        <v-date-picker v-model="project.start" @input="openStartPicker = false" />
                    </v-menu>
                    <v-select v-model="project.status" label="Status*" :items="statusList" item-value="id" item-text="text" required />
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
import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters } from "vuex";
import store from "./../store";
import moment from "moment";
import { IProject } from "./../types/IProject";

@Component({
    computed: {
        ...mapGetters(["projects"]),
    },
})
export default class projectDialog extends Vue {
    resolve: any;
    reject: any;

    private statusList = [
        { id: 0, text: "Initial" },
        { id: 1, text: "laufend" },
        { id: 2, text: "abgeschlossen" },
        { id: 3, text: "abgerechnet" },
    ];
    private dialogOpen = false;
    private openStartPicker = false;
    private edit = false;
    private project: IProject = {
        name: "",
        customer: "",
        start: moment().format("yyyy-MM-DD"),
        status: 0,
    };

    get formattedDate(): string {
        return moment(this.project.start).format("DD.MM.yyyy");
    }

    open(project?: IProject): Promise<void> {
        this.dialogOpen = true;
        this.edit = project ? true : false;

        this.project = project || {
            name: "",
            customer: "",
            start: moment().format("yyyy-MM-DD"),
            status: 0,
        };
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    save(): void {
        this.resolve();
        const payload: IProject = {
            _id: this.project._id,
            name: this.project.name,
            customer: this.project.customer,
            start: moment(this.project.start).toISOString(),
            status: this.project.status,
        };
        store.dispatch(this.edit ? "updateProject" : "createProject", payload).then(() => {
            this.dialogOpen = false;
        });
    }

    cancel(): void {
        this.resolve();
        this.dialogOpen = false;
    }
}
</script>
