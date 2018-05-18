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
        computed:{
            status : function(){
                electron.ipcRenderer.on('message', text =>{
                    if (text) return text;
                    else return "Scanning..."

                })
            }
        }
    }
</script>

<style scoped>

</style>