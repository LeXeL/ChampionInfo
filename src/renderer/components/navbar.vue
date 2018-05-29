<template>
    <div>
        <v-toolbar style="-webkit-app-region: drag;" dark fixed dense>
            <v-toolbar-title> 
                    ChampionInfo
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon @click="closeWindow()">
                <v-icon>close</v-icon>
            </v-btn> -->
        </v-toolbar>
    </div>
</template>
       


<script>
import electron from 'electron'
    export default {
        methods:{},
        methods:{
            closeWindows(){
                electron.remote.getCurrentWindow().close()
            }
        }
        
    }
</script>

<style scoped>
.navbar{
    -webkit-app-region: drag;
}
</style>