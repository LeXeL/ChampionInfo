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
        app class="pa-0"
        style="position:fixed; top:0; left:0; overflow-y:scroll;"
        >
        <v-layout column fill-height>
            <v-list>
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
            <v-spacer></v-spacer>            
            <v-list>
                <v-list-tile>
                    <v-list-tile-content>
                        <h4>LocalVersion: {{localVersion}}</h4>
                        <h3>Made by: <a class='board-item-a' :href="'https://github.com/LeXeL'" target='_blank'>LeXeL</a></h3> 
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-layout>   
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
        computed:{
            localVersion(){
                return this.$store.state.localVersion
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
            this.$el.querySelectorAll('.board-item-a').forEach(a => {
                a.addEventListener('click', (e) => {
                e.preventDefault()
                electron.shell.openExternal(e.target.href)
                })
            })
        },
        methods:{
            openExternal(){
                child_process.execSync('start http://example.com')
            }
        }
    }
</script>

<style scoped>
</style>