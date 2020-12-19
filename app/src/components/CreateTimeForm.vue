<template>
    <div class="projects">
        <div>Zeit Buchen</div>
        <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="submit">
                <validation-provider v-slot="{ errors }" name="project" rules="required|max:10">
                    <v-select v-model="project" :items="projects" :item-text="item => item.name" label="Projekt" required :error-messages="errors"> </v-select>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="date" rules="required">
                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date" :error-messages="errors" label="Datum" readonly v-bind="attrs" v-on="on" required />
                        </template>
                        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                    <v-text-field v-model="email" :error-messages="errors" label="E-mail" required></v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="select" rules="required">
                    <v-select v-model="select" :items="items" :error-messages="errors" label="Select" data-vv-name="select" required></v-select>
                </validation-provider>

                <v-btn class="mr-4" type="submit" :disabled="invalid"> Sichern </v-btn>
                <v-btn @click="clear"> Zurücksetzen </v-btn>
            </form>
        </validation-observer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import moment from "moment";
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

@Component({
    components: { ValidationProvider, ValidationObserver },
    computed: {
        ...mapGetters(["projects"]),
    },
    methods: {
        formatDate: value => {
            if (value) return moment(String(value)).format("DD.MM.yyyy");
        },
    },
    data: {
        menu2: false,
    },
})
export default class CreateTimeForm extends Vue {
    submit(): void {
        return;
    }
}
</script>
