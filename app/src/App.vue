<template>
    <div id="app">
        <v-app>
            <v-navigation-drawer app permanent>
                <template v-slot:prepend>
                    <v-list-item two-line>
                        <v-list-item-avatar>
                            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>Jane Smith</v-list-item-title>
                            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>

                <v-divider></v-divider>

                <v-list dense>
                    <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main>
                <v-container class="px-4 py-0 fill-height" fluid>
                    <v-row class="fill-height">
                        <v-col>
                            <transition name="fade">
                                <router-view></router-view>
                            </transition>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data: () => ({
        sidebarMenu: true,
        toggleMini: false,
        items: [
            { title: "Home", href: "/", icon: "mdi-home-outline" },
            { title: "Projekte", href: "/projects", icon: "mdi-view-list" },
            { title: "Zeit buchen", href: "/createTime", icon: "mdi-text-box-plus-outline" },
            { title: "Zeiten", href: "/time", icon: "mdi-av-timer" },
        ],
    }),
});
</script>

<style>
.required label::after {
    content: "*";
}
</style>
