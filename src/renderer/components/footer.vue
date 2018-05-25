<template>
    <div>
        <v-footer :fixed="true">
            <v-btn @click.native="drawer = !drawer">
                <v-icon class="icon grey--text text--darken-3">reorder</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
                <span style="margin-right:10px;">{{status}}</span>
        </v-footer> 
        <v-navigation-drawer
        v-model="drawer"
        temporary
        absolute
        >
        <v-list class="pt-0" dense>
        <br>
        <v-list-tile v-for="item in items" :key="item.title" @click="$router.push(item.to)">
            <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        </v-list>
        </v-navigation-drawer>  
    </div>
</template>

<script>
import electron from 'electron'
    export default {
        data(){
            return{
                drawer: null,
                status : 'Checking for updates...',
                items: [
                    { title: 'Home', icon: 'dashboard', to:'/' },
                    { title: 'Top Winrate', icon: 'list' ,to:'/topwinrate' }
                ],
            }
        },
        mounted(){
            electron.ipcRenderer.on('status', (event, data) => {
                if(data){
                    this.status = data;
                }else{
                    this.status = "You got the newest Version :)"
                }
            })
        },
        methods:{
        }
    }
</script>

<style scoped>
</style>