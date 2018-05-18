<template>
    <div>
         <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile :to="'/'">
            <v-list-tile-action>
                <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile><v-list-tile :to="'/complete-list'">
            <v-list-tile-action>
                <v-icon>list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Complete List</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
            <v-list-tile-action>
                <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Settings</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Vue Crypto</v-toolbar-title>
    </v-toolbar>
    </div>
</template>
        <!-- <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand class="brand" to="/">ChampionInfo</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item>Current LoL Version: {{localVersion}}</b-nav-item>
                    <b-nav-item to="/topwinrate"> Top winrate</b-nav-item>
                    <b-button @click="Refresh" to="/"> Refresh</b-button>
                    <b-nav-item href="#" disabled>Disabled</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        <div id="togglers">
            <div id="minimize"><span>-</span>
            </div>
            <div id="close"><span>&times;</span>
            </div>
        </div>
        </b-navbar> -->


<script>
    export default {
        data(){
            return{
                drawer: true
            }
        },
        methods:{
            Refresh(){
                localStorage.clear();
                this.$router.go('/')
            }
        },
        props: {   
            source: String
        },
        computed:{
            localVersion(){
                return this.$store.state.localVersion
            }
        }
        
    }
</script>

<style scoped>
</style>