<template>
    <div>
        <v-toolbar dark fixed dense>
            <v-toolbar-title> ChampionInfo</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeWindows">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>
       


<script>
import electron from 'electron'
    export default {
        methods:{
            Refresh(){
                localStorage.clear();
                this.$router.go('/')
            }
        },
        computed:{
            localVersion(){
                return this.$store.state.localVersion
            }
        },
        methods:{
            closeWindows(){
                electron.remote.getCurrentWindow().close()
            }
        }
        
    }
</script>

<style scoped>
nav{
    -webkit-app-region: drag;
}
</style>