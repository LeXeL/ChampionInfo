<template>
    <div>
        <v-app>
            <v-footer app fixed>
                <span>&copy; 2017</span>
            </v-footer>
        </v-app>
        
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
            lucho : function(){
                electron.ipcRenderer.on('message', text =>{
                    return text;
                })
            }
        }
    }
</script>

<style scoped>

</style>