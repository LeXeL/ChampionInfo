<template>
    <div>
        {{lucho}}
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