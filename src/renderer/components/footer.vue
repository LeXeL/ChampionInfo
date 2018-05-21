<template>
    <div>
        <v-footer :fixed="true">
            <v-btn>
                <v-icon class="grey--text text--darken-3">settings</v-icon>
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
                
            }
        },
        mounted(){
        },
        computed:{
            status(){
                electron.ipcRenderer.on('status', (event, data) => {
                    console.log(data)
                    return data
                })
                }
            }
    }
</script>

<style scoped>

</style>