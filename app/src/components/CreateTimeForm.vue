<template>
    <div class="projects">
        <div>Zeit Buchen</div>
        <!-- <validation-observer ref="observer" v-slot="{ invalid }"> -->
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-select
                v-model="project"
                label="Projekt"
                :items="projects"
                item-value="_id"
                item-text="name"
                required
                :error-messages="errors"
                data-vv-name="project"
            />
            <!-- <ValidationProvider v-slot="{ errors }" name="date" rules="required"> -->
            <v-menu v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="date" :error-messages="errors" label="Datum" readonly v-bind="attrs" v-on="on" required />
                </template>
                <v-date-picker v-model="date" @input="dateMenu = false"></v-date-picker>
            </v-menu>
            <!-- </ValidationProvider> -->
            <!-- <ValidationProvider v-slot="{ errors }" name="email" rules="required|email"> -->
            <v-text-field v-model="email" label="E-mail" required :error-messages="errors" />
            <!-- </ValidationProvider> -->

            <v-btn class="mr-4" :disabled="!valid" @click="validate"> Sichern </v-btn>
            <v-btn @click="clear"> Zurücksetzen </v-btn>
        </v-form>
        <!-- </validation-observer> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import moment from "moment";
import { ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

setInteractionMode("eager");

@Component({
    components: { ValidationProvider, ValidationObserver },
    computed: mapGetters(["projects"]),
})
export default class CreateTimeForm extends Vue {
    project!: string;
    date!: Date;
    valid!: boolean;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data(): Record<string, any> {
        return { project: this.project, date: this.date, email: "test 123", valid: true, dateMenu: false };
    }

    formatDate(value: string): string {
        if (value) return moment(String(value)).format("DD.MM.yyyy");
    }

    submit(): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.$refs.form as any).validate();
    }

    clear(): void {
        this.project = "";
        this.date = null;
    }
}
</script>
