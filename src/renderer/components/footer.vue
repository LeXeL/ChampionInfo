<template>
    <div>
        <v-footer :fixed="true">
            <v-btn>
                <v-icon class="icon grey--text text--darken-3">reorder</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
                <span>{{status}}</span>
        </v-footer>      
    </div>
</template>

<script>
import electron from 'electron'
    export default {
        data(){
            return{
                status : 'Checking for updates...'
            }
        },
        mounted(){
            electron.ipcRenderer.on('status', (event, data) => {
                this.status = data;
            })
        }
    }
</script>

<style scoped>
.icon{
    margin-bottom: 10px;
}
</style>