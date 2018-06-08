<template>
    <div>
        <v-footer :fixed="true">
            <v-btn @click.native="drawer = !drawer">
                <v-icon class="icon grey--text text--darken-3">reorder</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
                <a class='board-item-a' :href="'http://champion.gg'" target='_blank'>Champion.GG</a>
            <v-spacer></v-spacer>
                <v-progress-circular v-if="show"
                    :size="35"
                    :width="3"
                    :rotate="-90"
                    :value="value"
                    color="teal"
                    >
                    {{ value }}
                </v-progress-circular>
                <span v-if="!buttonShow" style="margin-right:10px; margin-left:15px;">{{status}}</span>
                <v-btn @click.native.stop="dialog = true" v-if="buttonShow" color="teal">Install New Update</v-btn>
        </v-footer> 
        <v-navigation-drawer
        style="position:fixed; top:0; left:0; overflow-y:scroll;"
        v-model="drawer"
        temporary
        absolute
        app class="pa-0"
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
                        <h4>LoL Current Version: {{localVersion}}</h4>
                        <h3>Made by: <a class='board-item-a' :href="'https://github.com/LeXeL'" target='_blank'>LeXeL</a></h3> 
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-layout>   
        </v-navigation-drawer>  
        <updateComponent :dialog.sync="dialog"></updateComponent>
    </div>
</template>

<script>
import electron from 'electron'
import updateComponent from '../components/modals/update.vue'
    export default {
        data(){
            return{
                value: 0,
                show:false,
                buttonShow:false,
                dialog: false,
                drawer: null,
                status : 'Checking for update...',
                items: [
                    { title: 'Home', icon: 'dashboard', to:'/' },
                    { title: 'Top Winrate', icon: 'list' ,to:'/topwinrate' }
                ],
            }
        },
        components:{
            updateComponent
        },
        computed:{
            localVersion(){
                return this.$store.state.localVersion
            }
        },
        mounted(){
            electron.ipcRenderer.on('status', (event, data) => {
                let analyzer = data.split(' ')[0].toString();
                if (analyzer == 'Downloaded'){
                    this.show = true;
                    this.value = parseInt(analyzer[1].split('.')[0]);
                    this.status = 'Downloading...'
                }
                else if (analyzer == 'Complete'){
                    this.show = false;
                    this.buttonShow = true;
                }
                else{
                    this.show = false;
                    this.buttonShow = false;
                    this.status = data
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
            installUpdate(){
                this.$emit('updateModal');
            }
        }
    }
</script>

<style scoped>
.board-item-a{
    text-decoration: none;
    color: teal
}

</style>