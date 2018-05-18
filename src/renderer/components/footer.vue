<template>
    <div>
        <v-footer app fixed>
            <span>&copy; 2017</span>
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