<template>
    <div class="projects">
        <div>Zeit Buchen</div>
        <validation-observer ref="observer" v-slot="{ handleSubmit, reset }">
            <v-form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="reset">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <validation-provider v-slot="{ errors }" name="Projekt" rules="required">
                                <v-select
                                    v-model="project"
                                    label="Projekt"
                                    :items="projects"
                                    item-value="_id"
                                    item-text="name"
                                    required
                                    data-vv-name="project"
                                    class="required"
                                    :error-messages="errors"
                                />
                            </validation-provider>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <validation-provider v-slot="{ errors }" name="Startzeit" rules="required">
                                <v-menu
                                    v-model="openTimeMenu"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="formattedDate"
                                            label="Datum"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            required
                                            class="required"
                                            :error-messages="errors"
                                        />
                                    </template>
                                    <v-date-picker v-model="date" @input="openTimeMenu = false" />
                                </v-menu>
                            </validation-provider>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="5">
                            <validation-provider v-slot="{ errors }" name="Startzeit" rules="required|times:@Endzeit">
                                <v-text-field
                                    v-model="startTime"
                                    label="Startzeit"
                                    v-mask="'##:##'"
                                    placeholder="__:__"
                                    required
                                    class="required"
                                    :error-messages="errors"
                                />
                            </validation-provider>
                        </v-col>
                        <v-col cols="12" md="5">
                            <validation-provider v-slot="{ errors }" name="Endzeit" rules="required">
                                <v-text-field
                                    v-model="endTime"
                                    label="Endzeit"
                                    v-mask="'##:##'"
                                    placeholder="__:__"
                                    required
                                    class="required"
                                    :error-messages="errors"
                                />
                            </validation-provider>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-text-field v-model="workedHours" disabled />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <validation-provider v-slot="{ errors }" name="Tätigkeit" rules="required">
                                <v-text-field v-model="activity" label="Tätigkeit" required class="required" :error-messages="errors" />
                            </validation-provider>
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn class="mr-4" type="submit"> Sichern </v-btn>
                <v-btn type="reset"> Zurücksetzen </v-btn>
            </v-form>
            <small>*Pflichtfelder</small>
        </validation-observer>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters } from "vuex";
import moment from "moment";
import { required } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";
import store from "./../store";
import { ITime } from "@/types/ITime";

extend("required", {
    ...required,
    message: "{_field_} muss angegeben werden",
});

extend("times", {
    params: ["target"],
    validate(value, { target }): boolean {
        return parseInt(value.replace(":", "")) < parseInt((target as string).replace(":", ""));
    },
    message: "Die Startzeit muss vor der Endzeit liegen",
});

setInteractionMode("eager");

@Component({
    components: { ValidationProvider, ValidationObserver },
    computed: mapGetters(["projects"]),
})
export default class CreateTimeForm extends Vue {
    private project = "";
    private date = moment().format("yyyy-MM-DD");
    private startTime = "";
    private endTime = "";
    private email = "test 123";
    private activity = "";
    private valid = true;
    private openTimeMenu = false;

    get formattedDate(): string {
        if (!this.date) return "";

        return moment(this.date).format("DD.MM.yyyy");
    }

    get workedHours(): string {
        if (!this.startTime || !this.endTime) return "";

        const startMoment = moment(`${this.date} ${this.startTime}`, "yyyy-MM-DD HH:mm");
        const endMoment = moment(`${this.date} ${this.endTime}`, "yyyy-MM-DD HH:mm");
        const duration = moment.duration(endMoment.diff(startMoment)).asHours();

        return `${duration.toString()} ${duration > 1 ? "Stunden" : "Stunde"}`;
    }

    async onSubmit(): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const valid = await (this.$refs.observer as any).validate();

        if (!valid) return;

        const time: ITime = {
            project: this.project,
            date: moment(this.date, "yyyy-MM-DD").toDate(),
            startTime: parseInt(this.startTime.replace(":", "")),
            endTime: parseInt(this.endTime.replace(":", "")),
            activity: this.activity,
        };

        store.dispatch("createTime", time);
    }

    clear(): void {
        this.project = "";
        this.date = moment().format("yyyy-MM-DD");
    }
}
</script>
